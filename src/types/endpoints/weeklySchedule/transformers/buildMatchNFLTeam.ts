import buildNFLTeamDataFromTeamsId from "../../common/transformers/buildNFLTeamDataFromTeamId";
import CompetitorRecordResponse from "../CompetitorRecordResponse";
import CompetitorResponse from "../CompetitorResponse";
import MatchNFLTeam from "../MatchNFLTeam";
import NFLTeamRecord from "../NFLTeamRecord";
import buildDetailedNFLTeam from "./buildDetailedNFLTeam";

export default function buildMatchNFLTeam(competitorResponse?: CompetitorResponse): MatchNFLTeam | undefined {
  if (!competitorResponse) {
    return;
  }

  const { id, uid, score, team, records } = competitorResponse;
  const detailedNflTeam = buildDetailedNFLTeam(team) || {};

  return {
    uid,
    nflTeamData: id ? buildNFLTeamDataFromTeamsId(parseInt(id)) : undefined,
    currentGameScore: score,
    record: records?.map(buildRecord),
    ...detailedNflTeam
  };
}

function buildRecord({ type, summary }: CompetitorRecordResponse): NFLTeamRecord {
  var wins;
  var loses;

  if (summary) {
    const [winNum, loseNum] = summary.split("-");
    wins = parseInt(winNum);
    loses = parseInt(loseNum);
  }

  return { type, wins, loses };
}
