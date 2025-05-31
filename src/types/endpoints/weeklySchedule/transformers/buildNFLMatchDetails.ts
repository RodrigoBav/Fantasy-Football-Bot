import EventCompetitionResponse from "../EventCompetitionResponse";
import EventCompetitionVenueResponse from "../EventCompetitionVenueResponse";
import EventResponse from "../EventResponse";
import EventStatusResponse from "../EventStatusResponse";
import NFLMatchDetails from "../NFLMatchDetails";
import VenueDetails from "../VenueDetails";

export default function buildNFLMatchDetails(
  { date, name, shortName, status }: EventResponse,
  competitionResponse?: EventCompetitionResponse
): NFLMatchDetails | undefined {
  const competitionDetails = buildCompetitionDetails(competitionResponse) || {};
  const statusDetails = buildStatusDetails(status) || {};

  return {
    startDateTime: date,
    matchDescription: name,
    matchShortDescription: shortName,
    ...competitionDetails,
    ...statusDetails
  };
}

function buildCompetitionDetails(competitionResponse?: EventCompetitionResponse): Partial<NFLMatchDetails> | undefined {
  if (!competitionResponse) {
    return;
  }

  const { neutralSite, conferenceCompetition, venue } = competitionResponse;

  return {
    atNeutralSite: neutralSite,
    isConferenceMatchup: conferenceCompetition,
    venueDetails: buildVenueDetails(venue)
  };
}

function buildVenueDetails(venueResponse?: EventCompetitionVenueResponse): VenueDetails | undefined {
  if (!venueResponse) {
    return;
  }

  const { id, fullName, address, indoor } = venueResponse;

  return {
    venueId: id,
    name: fullName,
    address: {
      city: address?.city,
      state: address?.state
    },
    isIndoor: indoor
  };
}

function buildStatusDetails(statusResponse?: EventStatusResponse): Partial<NFLMatchDetails> | undefined {
  if (!statusResponse) {
    return;
  }

  const { displayClock, period, type } = statusResponse;

  return {
    displayClock,
    period,
    status: type?.name,
    isCompleted: type?.completed,
    timeDescription: type?.detail,
    timeShortDescription: type?.shortDetail
  };
}
