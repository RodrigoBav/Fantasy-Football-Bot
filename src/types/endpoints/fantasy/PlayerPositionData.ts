import PlayerPosition from "./PlayerPosition";

export default interface PlayerPositionData {
  fantasyPositionId?: string;
  fantasyPosition?: PlayerPosition;
  eligibleNFLPositions?: string[];
}
