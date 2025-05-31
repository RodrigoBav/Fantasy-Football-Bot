import PlayerEntryResponse from "./PlayerEntryResponse";

export default interface RosterResponse {
  appliedStatTotal?: number;
  entries?: PlayerEntryResponse[];
}
