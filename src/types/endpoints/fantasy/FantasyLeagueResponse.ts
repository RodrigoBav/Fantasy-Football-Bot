import MemberResponse from "./MemberResponse";
import ScheduleResponse from "./ScheduleResponse";
import TeamResponse from "./TeamResponse";

export default interface FantasyLeagueResponse {
  id?: number;
  schedule: ScheduleResponse[];
  members?: MemberResponse[];
  teams?: TeamResponse[];
}
