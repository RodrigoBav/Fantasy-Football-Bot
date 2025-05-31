import NFLTeam from "../../../types/endpoints/common/NFLTeam";

const nflTeamAbbreviationMap: Record<NFLTeam, string> = {
  [NFLTeam.arizonaCardinals]: "ARI",
  [NFLTeam.atlantaFalcons]: "ATL",
  [NFLTeam.carolinaPanthers]: "CAR",
  [NFLTeam.chicagoBears]: "CHI",
  [NFLTeam.dallasCowboys]: "DAL",
  [NFLTeam.detroitLions]: "DET",
  [NFLTeam.greenBayPackers]: "GB",
  [NFLTeam.losAngelesRams]: "LAR",
  [NFLTeam.minnesotaVikings]: "MIN",
  [NFLTeam.newOrleansSaints]: "NO",
  [NFLTeam.newYorkGiants]: "NYG",
  [NFLTeam.philadelphiaEagles]: "PHI",
  [NFLTeam.sanFrancisco49ers]: "SF",
  [NFLTeam.seattleSeahawks]: "SEA",
  [NFLTeam.tampaBayBuccaneers]: "TB",
  [NFLTeam.washingtonCommanders]: "WSH",
  [NFLTeam.baltimoreRavens]: "BAL",
  [NFLTeam.buffaloBills]: "BUF",
  [NFLTeam.cincinnatiBengals]: "CIN",
  [NFLTeam.clevelandBrowns]: "CLE",
  [NFLTeam.denverBroncos]: "DEN",
  [NFLTeam.houstonTexans]: "HOU",
  [NFLTeam.indianapolisColts]: "IND",
  [NFLTeam.jacksonvilleJaguars]: "JAX",
  [NFLTeam.kansasCityCheifs]: "KC",
  [NFLTeam.lasVegasRaiders]: "LV",
  [NFLTeam.losAngelesChargers]: "LAC",
  [NFLTeam.miamiDolphins]: "MIA",
  [NFLTeam.newEnglandPatriots]: "NE",
  [NFLTeam.newYorkJets]: "NYJ",
  [NFLTeam.pittsburghSteelers]: "PIT",
  [NFLTeam.tennesseeTitans]: "TEN"
};

export default function getNFLTeamAbbreviation(team?: NFLTeam): string | undefined {
  if (!team) {
    return;
  }

  return nflTeamAbbreviationMap[team];
}
