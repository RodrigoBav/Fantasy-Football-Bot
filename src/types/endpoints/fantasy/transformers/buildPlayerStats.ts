import PlayerStat from "../PlayerStat";
import PlayerStats from "../PlayerStats";
import PlayerStatsResponse from "../PlayerStatsReponse";
import getNFLPlayerStatFromStatId from "./getNFLPlayerStatFromStatId";

export default function buildPlayerStats(statsResponse?: PlayerStatsResponse): PlayerStats | undefined {
  if (!statsResponse) {
    return;
  }

  const { id, externalId, appliedStats } = statsResponse;

  var appliedStatsResponse;

  if (typeof appliedStats !== "undefined" && appliedStats !== null && Array.isArray(appliedStats)) {
    if (appliedStats.length > 0) {
      appliedStatsResponse = appliedStats[0];
    }
  } else {
    appliedStatsResponse = appliedStats;
  }

  return {
    id,
    externalId,
    pointBreakdownByStat: buildStatBreakdown(appliedStatsResponse)
  };
}

function buildStatBreakdown(appliedStatsResponse?: {}): PlayerStat[] | undefined {
  if (typeof appliedStatsResponse === "undefined" && appliedStatsResponse === null) {
    return;
  }

  const allStatsString = JSON.stringify(appliedStatsResponse);
  const statBreakdownMap: PlayerStat[] = [];

  allStatsString
    .replace(/[{}]/g, "")
    .split(",")
    .forEach((statIdValueString) => {
      const [statIdVarName, value] = statIdValueString.split(":");
      const statId = statIdVarName.replace(/"/g, "");

      if (value !== "0") {
        statBreakdownMap.push(buildPlayerStat(statId, value));
      }
    });

  return statBreakdownMap;
}

function buildPlayerStat(statId: string, value: string): PlayerStat {
  return {
    id: statId,
    name: getNFLPlayerStatFromStatId(statId),
    value
  };
}
