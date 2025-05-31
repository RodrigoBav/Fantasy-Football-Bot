import NFLMatch from "../../../types/endpoints/weeklySchedule/NFLMatch";
import WeeklySchedule from "../../../types/endpoints/weeklySchedule/WeeklySchedule";
import getFantasyLeague from "../endpoints/getFantasyLeague";
import retryCall from "../endpoints/retryCall";
import findMyTeamInMatchup from "../utilities/findMyTeamInMatchup";
import findMyWeeklyFantasyMatchup from "../utilities/findMyWeeklyFantasyMatchup";
import { UniqueDateTime } from "./getUniqueGameTimes";
import { Message, TextChannel } from "discord.js";
import getGameTimeName from "../utilities/getGameTimeName";
import buildGameTimeTable from "./buildGameTimeTable";
import pingMessage from "../../discord-bot/utilities/pingMessage";
import buildMobileGameTimeMessages from "./buildMobileGameTimeMessages";

export default async function buildPlayerLineups(
  dateTimes: UniqueDateTime[],
  schedule: WeeklySchedule,
  discordChannel: TextChannel
) {
  const fanstayLeague = await retryCall(getFantasyLeague);
  const notificationMoment = dateTimes[dateTimes.length - 1].momentTime;
  const gameTimeName = getGameTimeName(notificationMoment.tz("America/Chicago"));

  if (!fanstayLeague) {
    discordChannel.send(
      `Failed 3 times to get fantasy league data, will not be creating the player lineup for ${gameTimeName}`
    );
    return;
  }

  const { week } = schedule;
  const { teams: fantasyTeams, schedule: fantasySchedule } = fanstayLeague;

  const myWeeklyMatchup = findMyWeeklyFantasyMatchup(fantasySchedule, week);

  if (!myWeeklyMatchup) {
    discordChannel.send(
      `Unable to find this weeks fantasy matchup, will not be creating the player lineup for ${gameTimeName}`
    );
    return;
  }

  const nflGames = getNflGames(dateTimes, schedule);

  if (nflGames.length === 0) {
    discordChannel.send(`No games found this week, will not be creating the player lineup for ${gameTimeName}`);
    return;
  }

  const fantasyMatchupTeams = findMyTeamInMatchup(myWeeklyMatchup);
  const tables = buildGameTimeTable(fantasyMatchupTeams, nflGames, fantasyTeams);

  if (!tables || tables.length === 0) {
    discordChannel.send(
      `No players on either team are playing at this time, will not be creating the player lineup for ${gameTimeName}`
    );
    return;
  }

  try {
    let threadMessage;

    const tableCodeblocks = tables.map((table) => "```" + table + "```");

    for (let i = 0; i < tableCodeblocks.length; i++) {
      if (i === 0) {
        const starterMessage = gameTimeName + "\n" + "(Mobile friendly view in thread)\n" + tableCodeblocks[i];

        threadMessage = await pingMessage({ message: starterMessage, discordChannel });
      } else {
        threadMessage = await discordChannel.send(tableCodeblocks[i]);
      }
    }

    if (threadMessage) {
      const messageThread = await threadMessage.startThread({
        name: gameTimeName,
        autoArchiveDuration: 60
      });

      const mobileMessage = buildMobileGameTimeMessages(fantasyMatchupTeams, nflGames, fantasyTeams);
      mobileMessage.forEach(async (message, index) => {
        await messageThread.send(message);

        // Archive thread once all messages are sent to avoid thread clutter
        if (index + 1 === mobileMessage.length) {
          messageThread.setArchived(true);
        }
      });
    } else {
      discordChannel.send(`Failed to create thread`);
    }
  } catch (e) {
    console.log(e);
    discordChannel.send(`Failed to send player lineup message for ${gameTimeName}`);
  }
}

function getNflGames(dateTimes: UniqueDateTime[], schedule: WeeklySchedule): NFLMatch[] {
  return dateTimes
    .map(({ timeId }) =>
      schedule.matches?.filter(({ matchDetails }) => {
        if (!matchDetails?.startDateTime) {
          return;
        }

        return matchDetails.startDateTime === timeId;
      })
    )
    .filter((matches) => matches !== undefined)
    .flat(1);
}

async function sendChannelMessage(
  tables: string[],
  gameTimeName: string,
  discordChannel: TextChannel
): Promise<Message<boolean>> {
  const tableCodeblocks = tables.map((table) => "```" + table + "```");
  const starterMessage = gameTimeName + "\n" + "(Mobile friendly view in thread)\n" + tableCodeblocks.shift(); // .shift() modifies original array, removing the first item

  if (tableCodeblocks.length === 1) {
    return await pingMessage({ message: starterMessage, discordChannel });
  } else {
    await pingMessage({ message: starterMessage, discordChannel });
    return await discordChannel.send(tableCodeblocks[1]);
  }
}
