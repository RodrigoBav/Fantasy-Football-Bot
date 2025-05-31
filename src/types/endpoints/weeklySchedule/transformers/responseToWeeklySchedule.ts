import WeeklySchedule from "../WeeklySchedule";
import WeeklyScheduleResponse from "../WeeklyScheduleResponse";
import buildNFLMatch from "./buildNFLMatch";

export default function transformResponseToWeeklySchedule(
  response?: WeeklyScheduleResponse
): WeeklySchedule | undefined {
  if (!response) {
    return;
  }

  const { season, week, events } = response;

  return {
    seasonId: season?.year?.toString(),
    seasonType: season?.type,
    week: week?.number,
    matches: events?.map(buildNFLMatch)
  };
}
