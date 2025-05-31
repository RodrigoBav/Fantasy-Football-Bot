import MemberResponse from "../MemberResponse";
import Team from "../Team";
import TeamsResponse from "../TeamResponse";

export default function (memberResponse: MemberResponse, teamsResponse?: TeamsResponse[]): Team | undefined {
  const swid = memberResponse.id;
  const teamData = teamsResponse?.find(({ primaryOwner }) => swid === primaryOwner);

  if (!teamData) {
    return;
  }

  const { firstName, lastName } = memberResponse;
  const { id, name, abbrev, points, pointsAdjusted } = teamData;

  return {
    swid,
    teamId: id?.toString(),
    teamName: name,
    teamAbbreviation: abbrev,
    firstName,
    lastName,
    points,
    pointsAdjusted
  };
}
