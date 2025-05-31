import { maxBy } from "lodash";
import Player from "../../../types/endpoints/fantasy/Player";
import NFLMatch from "../../../types/endpoints/weeklySchedule/NFLMatch";
import getPlayersByTeamId from "../utilities/getPlayersByTeamId";
import formatPlayerName from "../utilities/formatPlayerName";

export function getFormattedPlayersStrings(
  { homeTeam, awayTeam }: NFLMatch,
  fantasyTeamRoster: Player[] = []
): string[] {
  if (fantasyTeamRoster.length === 0 || (!homeTeam && !awayTeam)) {
    return [];
  }

  const homeTeamId = homeTeam?.nflTeamData?.id;
  const awayTeamId = awayTeam?.nflTeamData?.id;

  const homeFantasyPlayers = getPlayersByTeamId({ nflTeamId: homeTeamId, playerList: fantasyTeamRoster });
  const awayFantasyPlayers = getPlayersByTeamId({ nflTeamId: awayTeamId, playerList: fantasyTeamRoster });

  const formattedHomePlayerStrings = homeFantasyPlayers
    .map((player) => formatPlayerName(player, homeTeam?.abbreviatedName))
    .filter((formattedName) => formattedName !== undefined);

  const formattedAwayPlayerStrings = awayFantasyPlayers
    .map((player) => formatPlayerName(player, awayTeam?.abbreviatedName))
    .filter((formattedName) => formattedName !== undefined);

  return [...formattedHomePlayerStrings, ...formattedAwayPlayerStrings];
}

export function buildTeamCollumnSeparator(nflGames: NFLMatch[], teamName: string, players?: Player[]): string {
  const allPlayerNamesForGames = nflGames.map((match) => getFormattedPlayersStrings(match, players)).flat(1);

  const longestPlayerName =
    maxBy([...allPlayerNamesForGames, teamName], (playerName) => playerName.length)?.length ?? 0;

  return "-".repeat(longestPlayerName);
}
