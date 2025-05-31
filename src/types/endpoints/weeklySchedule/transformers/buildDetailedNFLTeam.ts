import DetailedNFLTeam from "../DetailedNFLTeam";
import DetailedNFLTeamResponse from "../DetailedNFLTeamResponse";

export default function buildDetailedNFLTeam(teamResponse?: DetailedNFLTeamResponse): DetailedNFLTeam | undefined {
  if (!teamResponse) {
    return;
  }

  const { location, name, abbreviation, displayName, shortDisplayName, isActive } = teamResponse;

  return {
    locationName: location,
    mascotName: name,
    fullName: displayName,
    shortName: shortDisplayName,
    abbreviatedName: abbreviation,
    isActive
  };
}
