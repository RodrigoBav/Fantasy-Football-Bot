import { Events } from "discord.js";
import DiscordClient from "../../Client";
import DiscordEvent from "../../Event";
import CronJobManager from "cron-job-manager";
import getFinalPlayerFantasyPerformances from "../../../fantasy/database/jobs/getFinalPlayerFantasyPerformances";

export default class DatabaseJobsEvent extends DiscordEvent {
  constructor(client: DiscordClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Set's up Database jobs",
      once: true
    });
  }

  async execute() {
    const jobManager = new CronJobManager();

    // Grabs the final player fantasy performances for the week
    jobManager.add(
      "get-final-player-performances",
      "30 23 * * 1", // Runs every Monday at 11:30 pm
      () => {
        getFinalPlayerFantasyPerformances();
      },
      { start: true, timezone: "America/Chicago" }
    );
  }
}
