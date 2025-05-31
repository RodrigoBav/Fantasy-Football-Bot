import Team from "../../../types/endpoints/fantasy/Team";
import NFLMatch from "../../../types/endpoints/weeklySchedule/NFLMatch";
import { SortedFantasyMatchupTeams } from "../utilities/findMyTeamInMatchup";
import { getFormattedPlayersStrings } from "./tableUtilities";
import ScheduleTeamOverview from "../../../types/endpoints/fantasy/ScheduleTeamOverview";

export default function buildMobileGameTimeMessages(
  myFantasyMatchupTeams: SortedFantasyMatchupTeams,
  nflGames: NFLMatch[],
  fantasyTeams?: Team[]
): string[] {
  const { myTeam, opponentTeam } = myFantasyMatchupTeams;
  const discordFormattedMessages: string[] = [];

  const myTeamName = fantasyTeams?.find(({ teamId }) => teamId && teamId === myTeam?.teamId)?.teamName ?? "My Players";
  const underlinedMyTeamName = "## __" + myTeamName + "__";

  const oppTeamName =
    fantasyTeams?.find(({ teamId }) => teamId && teamId === opponentTeam?.teamId)?.teamName ?? "Opponent Players";
  const underlinedOppTeamName = "## __" + oppTeamName + "__";

  nflGames.forEach(function (match) {
    const gameName =
      "# " + (match?.matchDetails?.matchDescription ?? match?.matchDetails?.matchShortDescription ?? "Game Name N/A");

    var myPlayerList = createPlayerList(match, myTeam);
    var oppPlayerList = createPlayerList(match, opponentTeam);

    if (!myPlayerList && !oppPlayerList) {
      return;
    }

    myPlayerList = myPlayerList ?? "No players in this game";
    oppPlayerList = oppPlayerList ?? "No players in this game";

    discordFormattedMessages.push(
      gameName +
        "\n\n" +
        underlinedMyTeamName +
        "\n" +
        myPlayerList +
        "\n\n" +
        underlinedOppTeamName +
        "\n" +
        oppPlayerList
    );
  });

  return discordFormattedMessages;
}

function createPlayerList(nflMatch: NFLMatch, fantasyTeam?: ScheduleTeamOverview): string | undefined {
  if (!fantasyTeam) {
    return;
  }

  const { totalRoster } = fantasyTeam;
  const activePlayers = totalRoster?.filter(({ isStarter }) => isStarter);

  const formattedPlayerStrings = getFormattedPlayersStrings(nflMatch, activePlayers);

  var playerList = "";

  formattedPlayerStrings.forEach((playerName, index) => {
    playerList = playerList + "- " + playerName;

    if (index + 1 < formattedPlayerStrings.length) {
      playerList = playerList + "\n";
    }
  });

  return playerList.length === 0 ? undefined : playerList;
}
