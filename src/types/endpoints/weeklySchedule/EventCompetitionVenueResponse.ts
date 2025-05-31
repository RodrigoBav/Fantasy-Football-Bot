import CompetitionVenueAddressResponse from "./CompetitionVenueAddressResponse";

export default interface EventCompetitionVenueResponse {
  id?: string;
  fullName?: string;
  address?: CompetitionVenueAddressResponse;
  indoor?: boolean;
}
