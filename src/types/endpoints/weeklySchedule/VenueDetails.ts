import VenueAddress from "./VenueAddress";

export default interface VenueDetails {
  venueId?: string;
  name?: string;
  address?: VenueAddress;
  isIndoor?: boolean;
}
