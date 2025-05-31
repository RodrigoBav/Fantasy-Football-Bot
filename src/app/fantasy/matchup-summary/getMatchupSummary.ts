import { ChatInputCommandInteraction } from "discord.js";
import getFantasyLeague from "../endpoints/getFantasyLeague";
import retryCall from "../endpoints/retryCall";
import findMyWeeklyFantasyMatchup from "../utilities/findMyWeeklyFantasyMatchup";
import findMyTeamInMatchup from "../utilities/findMyTeamInMatchup";
import Team from "../../../types/endpoints/fantasy/Team";
import ScheduleTeamOverview from "../../../types/endpoints/fantasy/ScheduleTeamOverview";
import { differenceBy } from "lodash";
import formatPlayerName from "../utilities/formatPlayerName";

const failureMessage = "I ran into an issue getting the summary, please try again";

export default async function getMatchupSummary(interaction: ChatInputCommandInteraction) {
  const fantasyLeague = await retryCall(getFantasyLeague);

  if (!fantasyLeague) {
    interaction.reply({
      content: failureMessage,
      ephemeral: true
    });
    return;
  }

  const { schedule, teams } = fantasyLeague;

  const myWeeklyMatchup = findMyWeeklyFantasyMatchup(schedule);

  if (!myWeeklyMatchup) {
    interaction.reply({
      content: failureMessage,
      ephemeral: true
    });
    return;
  }

  const { myTeam, opponentTeam } = findMyTeamInMatchup(myWeeklyMatchup);
  const myTeamDetails = teams?.find(({ teamId }) => teamId === myTeam?.teamId);
  const oppTeamDetails = teams?.find(({ teamId }) => teamId === opponentTeam?.teamId);

  const myTeamHeader = buildTeamHeader({ teamDetails: myTeamDetails, matchDetails: myTeam, isMyTeam: true });
  const oppTeamHeader = buildTeamHeader({ teamDetails: oppTeamDetails, matchDetails: opponentTeam, isMyTeam: false });

  const myTeamLeft = buildPlayersYetToPlay(myTeam);
  const oppTeamLeft = buildPlayersYetToPlay(opponentTeam);

  const formattedMyTeamSummary = myTeamHeader + "\n\n" + myTeamLeft;
  const formattedOppTeamSummary = oppTeamHeader + "\n\n" + oppTeamLeft;

  interaction.reply({
    content: formattedMyTeamSummary + "\n\n" + formattedOppTeamSummary,
    ephemeral: true
  });
}

interface BuildTeamHeaderParams {
  teamDetails?: Team;
  matchDetails?: ScheduleTeamOverview;
  isMyTeam: boolean;
}

function buildTeamHeader({ teamDetails, matchDetails, isMyTeam }: BuildTeamHeaderParams): string {
  const fallbackTeamName = isMyTeam ? "My Team" : "Opponent Team";
  const formattedTeamName = `**${teamDetails?.teamName ?? fallbackTeamName}**`;

  const teamOwnerName =
    teamDetails?.firstName && teamDetails.lastName ? teamDetails?.firstName + " " + teamDetails.lastName : undefined;

  const currentScore = `Current Points: ${matchDetails?.scoreBreakdown?.weeklyPointTotal ?? 0}`;

  const isProjectedWeeklyPointTotalDefined = !(
    typeof matchDetails?.scoreBreakdown?.projectedWeeklyPointTotal === "undefined" ||
    matchDetails?.scoreBreakdown?.projectedWeeklyPointTotal === null
  );
  const projectedTotalScore = `Projected Total Points: ${matchDetails?.scoreBreakdown?.projectedWeeklyPointTotal?.toFixed(2)}`;

  return (
    formattedTeamName +
    `${teamOwnerName ? " - " + teamOwnerName : ""}` +
    "\n" +
    currentScore +
    `${isProjectedWeeklyPointTotalDefined ? "\n" + projectedTotalScore : ""}`
  );
}

function buildPlayersYetToPlay(matchDetails?: ScheduleTeamOverview): string {
  const playedPlayers = matchDetails?.activeAndSecuredRoster ?? [];
  const allPlayers = matchDetails?.totalRoster;

  const unplayedStartingPlayers = differenceBy(allPlayers, playedPlayers, "id").filter(({ isStarter }) => isStarter);

  const numOfPlayersYetToPlay = unplayedStartingPlayers.length;

  if (numOfPlayersYetToPlay === 0) {
    return "No players left to play this week";
  }

  const header = `__${numOfPlayersYetToPlay} players left to play:__`;

  var playerlist = "";

  unplayedStartingPlayers.forEach((player, index) => {
    const formattedPlayerName = formatPlayerName(player);

    if (formattedPlayerName) {
      playerlist = playerlist + `- ${formattedPlayerName}`;

      if (index + 1 !== unplayedStartingPlayers.length) {
        playerlist = playerlist + "\n";
      }
    }
  });

  return header + "\n" + playerlist;
}
