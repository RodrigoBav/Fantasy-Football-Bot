import Player from "./Player";
import TeamScoreBreakdown from "./TeamScoreBreakdown";

export default interface ScheduleTeamOverview {
  teamId?: string;
  scoreBreakdown?: TeamScoreBreakdown;
  totalRoster?: Player[];
  activeAndSecuredRoster?: Player[];
}
