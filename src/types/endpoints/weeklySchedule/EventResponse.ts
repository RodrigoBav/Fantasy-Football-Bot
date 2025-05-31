import EventCompetitionResponse from "./EventCompetitionResponse";
import EventStatusResponse from "./EventStatusResponse";

export default interface EventResponse {
  id?: string;
  uid?: string;
  date?: string;
  name?: string;
  shortName?: string;
  competitions?: EventCompetitionResponse[];
  status?: EventStatusResponse;
}
