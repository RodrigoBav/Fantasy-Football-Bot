import NFLTeamData from "../common/NFLTeamData";
import InjuryStatus from "./InjuryStatus";
import PlayerPositionData from "./PlayerPositionData";
import PlayerScoreBreakdown from "./PlayerScoreBreakdown";
import PlayerStats from "./PlayerStats";

export default interface Player {
  id?: string;
  positionData?: PlayerPositionData;
  isStarter?: boolean;
  injuryStatus?: InjuryStatus;
  nflTeamData?: NFLTeamData;
  active?: boolean;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  jersey?: string;
  pointBreakdown?: PlayerScoreBreakdown;
  stats?: PlayerStats;
}
