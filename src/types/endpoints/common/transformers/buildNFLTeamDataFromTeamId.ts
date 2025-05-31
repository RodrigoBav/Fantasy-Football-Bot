import NFLTeam from "../NFLTeam";
import NFLTeamData from "../NFLTeamData";

const teamIdMap: Record<number, NFLTeam> = {
  1: NFLTeam.atlantaFalcons,
  2: NFLTeam.buffaloBills,
  3: NFLTeam.chicagoBears,
  4: NFLTeam.cincinnatiBengals,
  5: NFLTeam.clevelandBrowns,
  6: NFLTeam.dallasCowboys,
  7: NFLTeam.denverBroncos,
  8: NFLTeam.detroitLions,
  9: NFLTeam.greenBayPackers,
  10: NFLTeam.tennesseeTitans,
  11: NFLTeam.indianapolisColts,
  12: NFLTeam.kansasCityCheifs,
  13: NFLTeam.lasVegasRaiders,
  14: NFLTeam.losAngelesRams,
  15: NFLTeam.miamiDolphins,
  16: NFLTeam.minnesotaVikings,
  17: NFLTeam.newEnglandPatriots,
  18: NFLTeam.newOrleansSaints,
  19: NFLTeam.newYorkGiants,
  20: NFLTeam.newYorkJets,
  21: NFLTeam.philadelphiaEagles,
  22: NFLTeam.arizonaCardinals,
  23: NFLTeam.pittsburghSteelers,
  24: NFLTeam.losAngelesChargers,
  25: NFLTeam.sanFrancisco49ers,
  26: NFLTeam.seattleSeahawks,
  27: NFLTeam.tampaBayBuccaneers,
  28: NFLTeam.washingtonCommanders,
  29: NFLTeam.carolinaPanthers,
  30: NFLTeam.jacksonvilleJaguars,
  33: NFLTeam.baltimoreRavens,
  34: NFLTeam.houstonTexans
};

export default function buildNFLTeamDataFromTeamsId(teamId?: number): NFLTeamData | undefined {
  if (typeof teamId === "undefined" || teamId === null) {
    return;
  }

  return {
    id: teamId.toString(),
    team: teamIdMap[teamId]
  };
}
