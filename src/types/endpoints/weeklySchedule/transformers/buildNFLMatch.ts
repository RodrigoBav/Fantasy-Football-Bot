import EventResponse from "../EventResponse";
import NFLMatch from "../NFLMatch";
import NFLTeamHomeAwayType from "../NFLTeamHomeAwayType";
import buildMatchNFLTeam from "./buildMatchNFLTeam";
import buildNFLMatchDetails from "./buildNFLMatchDetails";

export default function buildNFLMatch(eventResponse: EventResponse): NFLMatch {
  const { id, uid, competitions } = eventResponse;
  const competition = competitions && competitions.length > 0 ? competitions[0] : undefined;

  const homeTeamResponse = competition?.competitors?.find(({ homeAway }) => homeAway === NFLTeamHomeAwayType.home);
  const awayTeamResponse = competition?.competitors?.find(({ homeAway }) => homeAway === NFLTeamHomeAwayType.away);

  return {
    uid,
    matchId: id,
    matchDetails: buildNFLMatchDetails(eventResponse, competition),
    homeTeam: buildMatchNFLTeam(homeTeamResponse),
    awayTeam: buildMatchNFLTeam(awayTeamResponse)
  };
}
