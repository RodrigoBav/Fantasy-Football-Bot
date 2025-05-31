import NFLPlayerStat from "../NFLPlayerStat";

const statIdtoPlayerStatMap: Record<string, NFLPlayerStat> = {
  "3": NFLPlayerStat.passingYards,
  "4": NFLPlayerStat.passingTouchdowns,
  "19": NFLPlayerStat.passing2PtConversions,
  "20": NFLPlayerStat.passingInterceptions,
  "24": NFLPlayerStat.rushingYards,
  "25": NFLPlayerStat.rushingTouchdowns,
  "26": NFLPlayerStat.rushing2PtConversions,
  "42": NFLPlayerStat.receivingYards,
  "43": NFLPlayerStat.receivingTouchdowns,
  "44": NFLPlayerStat.receiving2PtConversions,
  "53": NFLPlayerStat.receivingReceptions,
  "72": NFLPlayerStat.lostFumbles,
  "74": NFLPlayerStat.madeFieldGoalsFrom50Plus,
  "77": NFLPlayerStat.madeFieldGoalsFrom40To49,
  "80": NFLPlayerStat.madeFieldGoalsFromUnder40,
  "85": NFLPlayerStat.missedFieldGoals,
  "86": NFLPlayerStat.madeExtraPoints,
  "88": NFLPlayerStat.missedExtraPoints,
  "89": NFLPlayerStat.defensive0PointsAllowed,
  "90": NFLPlayerStat.defensive1To6PointsAllowed,
  "91": NFLPlayerStat.defensive7To13PointsAllowed,
  "92": NFLPlayerStat.defensive14To17PointsAllowed,
  "93": NFLPlayerStat.defensiveBlockedKickForTouchdowns,
  "95": NFLPlayerStat.defensiveInterceptions,
  "96": NFLPlayerStat.defensiveFumbles,
  "97": NFLPlayerStat.defensiveBlockedKicks,
  "98": NFLPlayerStat.defensiveSafeties,
  "99": NFLPlayerStat.defensiveSacks,
  "101": NFLPlayerStat.kickoffReturnTouchdown,
  "102": NFLPlayerStat.puntReturnTouchdown,
  "103": NFLPlayerStat.fumbleReturnTouchdown,
  "104": NFLPlayerStat.interceptionReturnTouchdown,
  "123": NFLPlayerStat.defensive28To34PointsAllowed,
  "124": NFLPlayerStat.defensive35To45PointsAllowed,
  "128": NFLPlayerStat.defensiveUnder100YardsAllowed,
  "129": NFLPlayerStat.defensive100To199YardsAllowed,
  "130": NFLPlayerStat.defensive200To299YardsAllowed,
  "132": NFLPlayerStat.defensive350To399YardsAllowed,
  "133": NFLPlayerStat.defensive400To449YardsAllowed,
  "134": NFLPlayerStat.defensive450To499YardsAllowed,
  "135": NFLPlayerStat.defensive500To549YardsAllowed,
  "136": NFLPlayerStat.defensiveOver550YardsAllowed
};

export default function getNFLPlayerStatFromStatId(statId?: string): NFLPlayerStat | undefined {
  if (!statId) {
    return;
  }

  return statIdtoPlayerStatMap[statId];
}
