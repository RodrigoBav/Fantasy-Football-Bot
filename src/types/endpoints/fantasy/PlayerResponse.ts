import PlayerStatsResponse from "./PlayerStatsReponse";

export default interface PlayerResponse {
  id?: number;
  proTeamId?: number;
  active?: boolean;
  eligibleSlots?: number[];
  firstName?: string;
  lastName?: string;
  fullName?: string;
  injured?: boolean;
  jersey?: string;
  stats?: PlayerStatsResponse[];
}
