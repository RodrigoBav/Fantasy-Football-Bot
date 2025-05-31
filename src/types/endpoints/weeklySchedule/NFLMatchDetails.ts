import EventStatusTypeName from "./EventStatusTypeName";
import VenueDetails from "./VenueDetails";

export default interface NFLMatchDetails {
  startDateTime?: string;
  matchDescription?: string;
  matchShortDescription?: string;
  displayClock?: string;
  period?: number;
  status?: EventStatusTypeName;
  isCompleted?: boolean;
  timeDescription?: string;
  timeShortDescription?: string;
  atNeutralSite?: boolean;
  isConferenceMatchup?: boolean;
  venueDetails?: VenueDetails;
}
