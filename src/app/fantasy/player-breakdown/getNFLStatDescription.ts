import NFLPlayerStat from "../../../types/endpoints/fantasy/NFLPlayerStat";

const nflStatToDescriptionMap: Record<NFLPlayerStat, string> = {
  [NFLPlayerStat.passingYards]: "Passing Yards",
  [NFLPlayerStat.passingTouchdowns]: "Passing Touchdowns",
  [NFLPlayerStat.passing2PtConversions]: "Passing 2 Pt. Conversions",
  [NFLPlayerStat.passingInterceptions]: "Interceptions Thrown",
  [NFLPlayerStat.rushingYards]: "Rush Yards",
  [NFLPlayerStat.rushingTouchdowns]: "Rushing Touchdowns",
  [NFLPlayerStat.rushing2PtConversions]: "Rushing 2 Pt. Conversions",
  [NFLPlayerStat.receivingYards]: "Receiving Yards",
  [NFLPlayerStat.receivingTouchdowns]: "Recieving Touchdowns",
  [NFLPlayerStat.receiving2PtConversions]: "Recieving 2 Pt. Conversions",
  [NFLPlayerStat.receivingReceptions]: "Receiving Receptions",
  [NFLPlayerStat.lostFumbles]: "Lost Fumbles",
  [NFLPlayerStat.madeFieldGoalsFrom50Plus]: "50+ Yard Field Goals",
  [NFLPlayerStat.madeFieldGoalsFrom40To49]: "40-49 Yard Field Goals",
  [NFLPlayerStat.madeFieldGoalsFromUnder40]: "0-40 Yard Field Goals",
  [NFLPlayerStat.missedFieldGoals]: "Missed Field Goals",
  [NFLPlayerStat.madeExtraPoints]: "Extra Points",
  [NFLPlayerStat.missedExtraPoints]: "Missed Extra Points",
  [NFLPlayerStat.defensive0PointsAllowed]: "0 Points Allowed",
  [NFLPlayerStat.defensive1To6PointsAllowed]: "1-6 Points Allowed",
  [NFLPlayerStat.defensive7To13PointsAllowed]: "7-13 Points Allowed",
  [NFLPlayerStat.defensive14To17PointsAllowed]: "14-17 Points Allowed",
  [NFLPlayerStat.defensiveBlockedKickForTouchdowns]: "Blocked Kicks Returned For Touchdowns",
  [NFLPlayerStat.defensiveInterceptions]: "Defensive Interceptions",
  [NFLPlayerStat.defensiveFumbles]: "Fumbles Won",
  [NFLPlayerStat.defensiveBlockedKicks]: "Blocked Kicks",
  [NFLPlayerStat.defensiveSafeties]: "Defensive Safety",
  [NFLPlayerStat.defensiveSacks]: "Sacks",
  [NFLPlayerStat.kickoffReturnTouchdown]: "Kickoffs Returned For Touchdowns",
  [NFLPlayerStat.puntReturnTouchdown]: "Punts Returned For Touchdowns",
  [NFLPlayerStat.fumbleReturnTouchdown]: "Fumbles Returned For Touchdowns",
  [NFLPlayerStat.interceptionReturnTouchdown]: "Interceptions Returned For Touchdowns",
  [NFLPlayerStat.defensive28To34PointsAllowed]: "28-32 Points Allowed",
  [NFLPlayerStat.defensive35To45PointsAllowed]: "35-45 Points Allowed",
  [NFLPlayerStat.defensiveUnder100YardsAllowed]: "0-100 Yards Allowed",
  [NFLPlayerStat.defensive100To199YardsAllowed]: "100-199 Yards Allowed",
  [NFLPlayerStat.defensive200To299YardsAllowed]: "200-299 Yards Allowed",
  [NFLPlayerStat.defensive350To399YardsAllowed]: "350-399 Yards Allowed",
  [NFLPlayerStat.defensive400To449YardsAllowed]: "400-449 Yards Allowed",
  [NFLPlayerStat.defensive450To499YardsAllowed]: "450-499 Yards Allowed",
  [NFLPlayerStat.defensive500To549YardsAllowed]: "500-549 Yards Allowed",
  [NFLPlayerStat.defensiveOver550YardsAllowed]: "550+ Yards Allowed"
};

export default function getNFLStatDescription(nflStat?: NFLPlayerStat): string | undefined {
  if (!nflStat) {
    return;
  }

  return nflStatToDescriptionMap[nflStat];
}
