export default interface PlayerStatsResponse {
  id?: string;
  externalId?: string;
  // This is a wierd one since the variable names are stat ID's(look at response).
  // I will stringify the object and create a key value paring for all the stats.
  appliedStats?: {}[] | {};
  appliedTotal?: number;
  appliedTotalCeiling?: number;
}
