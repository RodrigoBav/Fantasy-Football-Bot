import { ChatInputCommandInteraction, ComponentType, InteractionResponse, Message } from "discord.js";
import getFantasyLeague from "../endpoints/getFantasyLeague";
import retryCall from "../endpoints/retryCall";
import findMyTeamInMatchup from "../utilities/findMyTeamInMatchup";
import findMyWeeklyFantasyMatchup from "../utilities/findMyWeeklyFantasyMatchup";
import createPlayerSelectMenu from "./createPlayerSelectMenu";
import Player from "../../../types/endpoints/fantasy/Player";
import buildPlayerStatBreakdownMessage from "./buildPlayerStatBreakdownMessage";
import moment from "moment-timezone";
import getWeeklyPlayerPerformanceId from "../database/getWeeklyPlayerPerformanceId";
import DataBaseClient from "../DataBaseClient";
import ModelNames from "../../../types/database/ModelNames";

const failureMessage = "I ran into an issue getting this players score breakdown, please try again";
const playerSelectMenuId = "playerSelect";

export default async function getPlayerScoreBreakdown(interaction: ChatInputCommandInteraction) {
  const activeAndSecuredRoster = await getActiveAndSecuredRoster(interaction);

  if (!activeAndSecuredRoster) {
    // Error messaging handled in retrieval method
    return;
  }

  // Since this is an ephemeral message, it will last 15 minutes before disapearing. (kinda long but it should be fine)
  const replyResponse = await createPlayerSelectionResponse(interaction, activeAndSecuredRoster);

  if (!replyResponse) {
    interaction.reply({
      content: "Sorry, I had an issue rendering the select menu. Please try again",
      ephemeral: true
    });
    return;
  }

  const collector = replyResponse.createMessageComponentCollector({ componentType: ComponentType.StringSelect });

  collector.on("collect", (collectorResponse) => {
    if (collectorResponse.customId === playerSelectMenuId) {
      const selectedPlayers = activeAndSecuredRoster.filter(({ id }) => id && collectorResponse.values.includes(id));
      const statBreakdownMessages = selectedPlayers.map(buildPlayerStatBreakdownMessage);

      var breakdownMessage = "";
      statBreakdownMessages.forEach((message, index) => {
        breakdownMessage = breakdownMessage + message;

        if (index + 1 !== statBreakdownMessages.length) {
          breakdownMessage = breakdownMessage + "\n";
        }
      });

      collectorResponse.reply({
        content: breakdownMessage,
        ephemeral: true
      });
    }
  });
}

async function createPlayerSelectionResponse(
  interaction: ChatInputCommandInteraction,
  activeAndSecuredRoster: Player[]
): Promise<(Message<boolean> & InteractionResponse<boolean>) | undefined> {
  try {
    return interaction.reply({
      ephemeral: true,
      fetchReply: true,
      content: "Select player(s) to see how they performed this week",
      //@ts-ignore
      components: [createPlayerSelectMenu(playerSelectMenuId, activeAndSecuredRoster)]
    });
  } catch (e) {
    console.log(e);
  }
}

function isPostNFLWeek(): boolean {
  const now = moment().tz("America/Chicago");

  // Get the current week number
  const currentWeek = now.isoWeek();

  // Define the start and end times for the range
  const startOfRange = moment().isoWeek(currentWeek).isoWeekday(2).startOf("day").tz("America/Chicago"); // Tuesday 00:00
  const endOfRange = moment().isoWeek(currentWeek).isoWeekday(4).startOf("day").add(12, "hours").tz("America/Chicago"); // Thursday 12:00

  // Check if the current time is within the range
  return now.isBetween(startOfRange, endOfRange);
}

async function getActiveAndSecuredRoster(interaction: ChatInputCommandInteraction): Promise<Player[] | undefined> {
  if (isPostNFLWeek()) {
    // Regarding retrying:
    // for now lets not, I am not awaiting closing the connection. If I retry I may attempt
    // to connect before the close action has finished which could lead to problems
    const playerList: Player[] | undefined = await new DataBaseClient().get(
      ModelNames.weeklyPlayerPerformances,
      getWeeklyPlayerPerformanceId()
    );

    if (!playerList) {
      interaction.reply({
        content: failureMessage,
        ephemeral: true
      });
      return;
    }

    return playerList;
  } else {
    const fantasyLeague = await retryCall(getFantasyLeague);

    if (!fantasyLeague) {
      interaction.reply({
        content: failureMessage,
        ephemeral: true
      });
      return;
    }

    const { myTeam } = findMyTeamInMatchup(findMyWeeklyFantasyMatchup(fantasyLeague.schedule) ?? {});

    if (!myTeam) {
      interaction.reply({
        content: failureMessage,
        ephemeral: true
      });
      return;
    }

    const { activeAndSecuredRoster } = myTeam;

    if (!activeAndSecuredRoster || activeAndSecuredRoster.length === 0) {
      interaction.reply({
        content: "No players have played yet",
        ephemeral: true
      });
      return;
    }

    return activeAndSecuredRoster;
  }
}
