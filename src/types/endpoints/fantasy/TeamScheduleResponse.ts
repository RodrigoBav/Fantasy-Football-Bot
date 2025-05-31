import RosterResponse from "./RosterResponse";

export default interface TeamScheduleResponse {
  teamId?: number;
  totalPoints?: number;
  totalPointsLive?: number;
  totalProjectedPointsLive?: number;
  rosterForCurrentScoringPeriod?: RosterResponse;
  rosterForMatchupPeriod?: RosterResponse;
}
