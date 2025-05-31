import ScheduleTeamOverview from "./ScheduleTeamOverview";

export default interface Matchup {
  id?: string;
  week?: number;
  home?: ScheduleTeamOverview;
  away?: ScheduleTeamOverview;
}
