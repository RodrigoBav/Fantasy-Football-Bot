import PlayerResponse from "./PlayerResponse";

export default interface PlayerPoolEntryResponse {
  id?: number;
  onTeamId?: number;
  appliedStatTotal?: number;
  player?: PlayerResponse;
}
