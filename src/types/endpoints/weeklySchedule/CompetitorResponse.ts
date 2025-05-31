import CompetitorRecordResponse from "./CompetitorRecordResponse";
import DetailedNFLTeamResponse from "./DetailedNFLTeamResponse";
import NFLTeamHomeAwayType from "./NFLTeamHomeAwayType";

export default interface CompetitorResponse {
  id?: string;
  uid?: string;
  homeAway?: NFLTeamHomeAwayType;
  score?: number;
  team?: DetailedNFLTeamResponse;
  records?: CompetitorRecordResponse[];
}
