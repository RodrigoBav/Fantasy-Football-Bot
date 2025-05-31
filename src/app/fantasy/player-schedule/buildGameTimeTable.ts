import { Align, getMarkdownTable, Row } from "markdown-table-ts";
import Team from "../../../types/endpoints/fantasy/Team";
import NFLMatch from "../../../types/endpoints/weeklySchedule/NFLMatch";
import { SortedFantasyMatchupTeams } from "../utilities/findMyTeamInMatchup";
import { maxBy } from "lodash";
import { buildTeamCollumnSeparator, getFormattedPlayersStrings } from "./tableUtilities";
import splitTableMessages from "./splitTableMessages";

export default function buildGameTimeTable(
  myFantasyMatchupTeams: SortedFantasyMatchupTeams,
  nflGames: NFLMatch[],
  fantasyTeams?: Team[]
): string[] | undefined {
  const { myTeam, opponentTeam } = myFantasyMatchupTeams;

  const myTeamName = fantasyTeams?.find(({ teamId }) => teamId && teamId === myTeam?.teamId)?.teamName ?? "My Players";
  const oppTeamName =
    fantasyTeams?.find(({ teamId }) => teamId && teamId === opponentTeam?.teamId)?.teamName ?? "Opponent Players";

  const body = buildTableBody(nflGames, myFantasyMatchupTeams, { myTeamName, oppTeamName });

  if (body.length === 0) {
    return;
  }

  const markdownTable = getMarkdownTable({
    table: {
      head: ["Game", myTeamName, oppTeamName],
      body
    },
    alignment: [Align.Center, Align.Left, Align.Left]
  });

  return markdownTable.length < 1800 ? [markdownTable] : splitTableMessages(body, myTeamName, oppTeamName);
}

function buildTableBody(
  nflGames: NFLMatch[],
  { myTeam, opponentTeam }: SortedFantasyMatchupTeams,
  { myTeamName, oppTeamName }: { myTeamName: string; oppTeamName: string }
): Row[] {
  const body: Row[] = [];

  const longestGameName =
    maxBy(nflGames, ({ matchDetails }) => matchDetails?.matchDescription?.length)?.matchDetails?.matchDescription
      ?.length ?? 0;

  const myActivePlayers = myTeam?.totalRoster?.filter(({ isStarter }) => isStarter);
  const oppActivePlayers = opponentTeam?.totalRoster?.filter(({ isStarter }) => isStarter);

  const gameCollumnSeparator = "-".repeat(longestGameName);
  const myCollumnSeparator = buildTeamCollumnSeparator(nflGames, myTeamName, myActivePlayers);
  const oppCollumnSeparator = buildTeamCollumnSeparator(nflGames, oppTeamName, oppActivePlayers);

  nflGames.forEach(function (match) {
    const gameName =
      match.matchDetails?.matchDescription ?? match.matchDetails?.matchShortDescription ?? "Game Name N/A";
    const myPlayerStrings = getFormattedPlayersStrings(match, myActivePlayers);
    const oppPlayerStrings = getFormattedPlayersStrings(match, oppActivePlayers);

    const longestPlayerStringsLength = Math.max(myPlayerStrings.length, oppPlayerStrings.length);

    if (longestPlayerStringsLength === 0) {
      return;
    }

    for (var index = 0; index < longestPlayerStringsLength; index++) {
      var myPlayerString = "";
      var oppPlayerString = "";

      if (index + 1 <= myPlayerStrings.length) {
        myPlayerString = myPlayerStrings[index];
      }

      if (index + 1 <= oppPlayerStrings.length) {
        oppPlayerString = oppPlayerStrings[index];
      }

      body.push(index === 0 ? [gameName, myPlayerString, oppPlayerString] : ["", myPlayerString, oppPlayerString]);
    }

    body.push(["", "", ""]);
    body.push([gameCollumnSeparator, myCollumnSeparator, oppCollumnSeparator]);
  });

  const cleanedBody = body.filter((bodyEntry) => bodyEntry !== undefined);

  if (cleanedBody.length > 1) {
    cleanedBody.splice(-2);
  }

  return cleanedBody;
}
