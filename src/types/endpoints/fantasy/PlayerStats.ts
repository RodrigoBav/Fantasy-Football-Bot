import PlayerStat from "./PlayerStat";

export default interface PlayerStats {
  id?: string;
  externalId?: string;
  pointBreakdownByStat?: PlayerStat[];
}
