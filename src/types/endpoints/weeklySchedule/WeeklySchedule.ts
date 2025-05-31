import NFLMatch from "./NFLMatch";

export default interface WeeklySchedule {
  seasonId?: string;
  seasonType?: number;
  week?: number;
  matches?: NFLMatch[];
}
