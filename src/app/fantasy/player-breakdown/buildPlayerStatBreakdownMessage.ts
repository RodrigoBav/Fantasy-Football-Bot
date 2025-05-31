import Player from "../../../types/endpoints/fantasy/Player";
import formatPlayerName from "../utilities/formatPlayerName";
import getNFLStatDescription from "./getNFLStatDescription";

export default function buildPlayerStatBreakdownMessage(player: Player): string {
  const { pointBreakdown, stats } = player;

  const playerFormattedName = `**${formatPlayerName(player)}: **`;

  const earnedPoints = pointBreakdown?.actualPoints?.toString().includes(".")
    ? pointBreakdown?.actualPoints.toFixed(2)
    : pointBreakdown?.actualPoints;
  const pointsString = earnedPoints ? earnedPoints + " points" : "";

  const playerHeader = playerFormattedName + pointsString;

  const playerStats = stats?.pointBreakdownByStat;

  if (!playerStats || playerStats.length === 0) {
    return playerHeader + "\n" + "Sorry, stat breakdown is unavailable for this player" + "\n";
  }

  var statBreakdownMessage = "";

  playerStats.forEach(({ id, name, value }) => {
    if (!value) {
      return;
    }

    const statDescription = getNFLStatDescription(name) ?? id ?? "Unknown Stat";
    const formattedPoints = value.includes(".") ? parseFloat(value).toFixed(2) : value;

    statBreakdownMessage = statBreakdownMessage + `- ${statDescription}: ${formattedPoints} \n`;
  });

  return playerHeader + "\n" + statBreakdownMessage;
}
