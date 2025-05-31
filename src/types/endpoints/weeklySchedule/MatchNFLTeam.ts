import NFLTeamData from "../common/NFLTeamData";
import DetailedNFLTeam from "./DetailedNFLTeam";
import NFLTeamRecord from "./NFLTeamRecord";

export default interface MatchNFLTeam extends DetailedNFLTeam {
  uid?: string;
  nflTeamData?: NFLTeamData;
  currentGameScore?: number;
  record?: NFLTeamRecord[];
}
