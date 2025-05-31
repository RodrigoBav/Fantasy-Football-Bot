import EventStatusTypeResponse from "./EventStatusTypeResponse";

export default interface EventStatusResponse {
  clock?: number;
  displayClock?: string;
  period?: number;
  type?: EventStatusTypeResponse;
}
