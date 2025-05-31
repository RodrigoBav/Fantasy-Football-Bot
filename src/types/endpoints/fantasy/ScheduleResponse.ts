import TeamScheduleResponse from "./TeamScheduleResponse";

export default interface ScheduleResponse {
  id?: number;
  home?: TeamScheduleResponse;
  away?: TeamScheduleResponse;
  matchupPeriodId: number;
}
