import InjuryStatus from "./InjuryStatus";
import PlayerPoolEntryResponse from "./PlayerPoolEntryResponse";
import PlayerStatus from "./PlayerStatus";

export default interface PlayerEntryResponse {
  playerId?: number;
  lineupSlotId?: number;
  injuryStatus?: InjuryStatus;
  playerPoolEntry?: PlayerPoolEntryResponse;
  status?: PlayerStatus;
}
