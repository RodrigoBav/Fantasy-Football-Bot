import ModelNames from "../../../types/database/ModelNames";
import getSeasonWeek from "../utilities/getSeasonWeek";

export default function getWeeklyNFLScheduleId(): string {
  return ModelNames.weeklyNFLSchedule + ":" + getSeasonWeek();
}
