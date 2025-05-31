import MatchNFLTeam from "./MatchNFLTeam";
import NFLMatchDetails from "./NFLMatchDetails";

export default interface NFLMatch {
  uid?: string;
  matchId?: string;
  matchDetails?: NFLMatchDetails;
  homeTeam?: MatchNFLTeam;
  awayTeam?: MatchNFLTeam;
}
