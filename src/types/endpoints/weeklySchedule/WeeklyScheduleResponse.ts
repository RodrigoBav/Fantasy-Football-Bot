import EventResponse from "./EventResponse";
import SeasonResponse from "./SeasonResponse";
import WeekResponse from "./WeekResponse";

export default interface WeeklyScheduleResponse {
  season?: SeasonResponse;
  week?: WeekResponse;
  events?: EventResponse[];
}
