import CompetitorResponse from "./CompetitorResponse";
import EventCompetitionVenueResponse from "./EventCompetitionVenueResponse";

export default interface EventCompetitionResponse {
  id?: string;
  uid?: string;
  date?: string;
  timeValid?: boolean;
  neutralSite?: boolean;
  conferenceCompetition?: boolean;
  competitors?: CompetitorResponse[];
  venue?: EventCompetitionVenueResponse;
}
