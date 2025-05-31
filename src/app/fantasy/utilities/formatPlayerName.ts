import Player from "../../../types/endpoints/fantasy/Player";
import getNFLTeamAbbreviation from "./getNFLTeamAbbreviation";
import getPositionAbbreviation from "./getPositionAbbreviation";

export default function formatPlayerName(
  { fullName, nflTeamData, positionData }: Player,
  teamAbbrevName = getNFLTeamAbbreviation(nflTeamData?.team)
): string | undefined {
  if (!fullName || fullName.length === 0) {
    return;
  }

  const abbrevPosition = getPositionAbbreviation(positionData);
  const playerTeam = teamAbbrevName ?? "N/A";

  const playerDetails = abbrevPosition ? `(${abbrevPosition}, ${playerTeam})` : "";

  return fullName + playerDetails;
}
