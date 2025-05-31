import { Events, TextChannel } from "discord.js";
import DiscordClient from "../../Client";
import DiscordEvent from "../../Event";
import CronJobManager from "cron-job-manager";
import getWeeklySchedule from "../../../fantasy/endpoints/getWeeklySchedule";
import getUniqueGameTimes from "../../../fantasy/player-schedule/getUniqueGameTimes";
import retryCall from "../../../fantasy/endpoints/retryCall";
import buildPlayerLineups from "../../../fantasy/player-schedule/buildPlayerLineups";
import moment from "moment-timezone";
import getSeasonWeek from "../../../fantasy/utilities/getSeasonWeek";

export default class GetPlayerScheduleEvent extends DiscordEvent {
  constructor(client: DiscordClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Creates the cron manager and gets the schedule for the week",
      once: true
    });
  }

  async execute() {
    const fantasyChannel = (await this.client.channels.fetch(this.client.config.reportingChannelId)) as TextChannel;

    // At 12:00 on every 4th day-of-week(thursday)
    const weeklyScheduleRunDate = "0 12 * * */4";
    const weeklyScheduleJobName = "Weekly Schedule";

    const gameJobManager = new CronJobManager();
    
    // Kickstart the jobs if app is started in the middle of the NFL weekend
    if (this.isMiddleOfNFLWeek()) {
      this.createGameTimeJobs(gameJobManager, fantasyChannel);
    }

    new CronJobManager(
      weeklyScheduleJobName,
      weeklyScheduleRunDate,
      () => {
        gameJobManager.deleteAll();
        this.createGameTimeJobs(gameJobManager, fantasyChannel);
      },
      {
        start: true,
        timezone: "America/Chicago"
      }
    );
  }

  private isMiddleOfNFLWeek(): boolean {
    // Get the current date and time
    const now = moment();

    // Find the previous Thursday at 7:25 PM
    const previousThursday = moment().day(4).hour(19).minute(25).second(0);

    // If today is before Thursday 7:25 PM, go back one week
    if (now.isBefore(previousThursday)) {
      previousThursday.subtract(1, "week");
    }

    // Find the upcoming Monday at 7:24 PM
    const upcomingMonday = previousThursday.clone().add(4, "days").hour(19).minute(24).second(0);

    // Check if the current date and time is between the previous Thursday 7:25 PM and the upcoming Monday 7:24 PM
    return now.isBetween(previousThursday, upcomingMonday, null, "[]");
  }

  private async createGameTimeJobs(cronManager: CronJobManager, discordChannel: TextChannel) {
    const seasonWeek = getSeasonWeek();

    if (seasonWeek > 18) {
      console.log("The regular season has ended");
      cronManager.deleteAll();
      return;
    }

    const weeklySchedule = await retryCall(() => getWeeklySchedule(seasonWeek));

    if (!weeklySchedule) {
      discordChannel.send("Failed 3 times to get weekly schedule, will not be creating the player lineup this week");
      return;
    }

    const uniqueGameTimes = getUniqueGameTimes(weeklySchedule);

    var skipNextEntry = false;
    uniqueGameTimes.forEach(function (dateTime, index) {
      if (skipNextEntry) {
        skipNextEntry = false;
        return;
      }

      const jobDateTimes = [dateTime];
      //handle afternoon games starting 20 minutes apart, combines them into 1 notification
      //This isnt the best, sorta hardcoded for this situation. I think it will be ok tho
      if (index + 1 !== uniqueGameTimes.length) {
        const currentDateTimeMoment = dateTime.momentTime;
        const nextDateTimeMoment = uniqueGameTimes[index + 1].momentTime;

        if (nextDateTimeMoment.diff(currentDateTimeMoment, "m") < 30) {
          jobDateTimes.push(uniqueGameTimes[index + 1]);
          skipNextEntry = true;
        }
      }

      // Choosing to pass in the weekly schedule gotten from wednesday instead of re-fetching the schedule
      // on time of building the player line-up.
      // This means I will "technically" be using stale schedule data.
      // Taking this risk cause there is a very low chance of games getting rescheduled.
      //
      // Plus I don't have logic to support rescheduled games anyway right now

      const notificationDateTime = jobDateTimes[jobDateTimes.length - 1];
      const jobRunTime = notificationDateTime.momentTime.add(5, "m");

      if (jobRunTime.isAfter(moment())) {
        // Send notification 5 minutes after game start to avoid stale fantasy data
        cronManager.add(
          notificationDateTime.timeId,
          jobRunTime.toDate(),
          () => {
            buildPlayerLineups(jobDateTimes, weeklySchedule, discordChannel);
          },
          { start: true }
        );
      }
    });
  }
}
