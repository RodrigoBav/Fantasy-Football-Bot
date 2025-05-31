import PlayerPosition from "../PlayerPosition";

const slotIdToPostionMap: Record<string, PlayerPosition> = {
  "0": PlayerPosition.quarterBack,
  "2": PlayerPosition.runningBack,
  "4": PlayerPosition.wideReciever,
  "6": PlayerPosition.tightEnd,
  "16": PlayerPosition.defense,
  "17": PlayerPosition.kicker,
  "20": PlayerPosition.bench,
  "21": PlayerPosition.injuryReserve,
  "23": PlayerPosition.flex
};

export default function buildPositionFromSlotId(slotId?: string): PlayerPosition | undefined {
  if (!slotId) {
    return;
  }

  return slotIdToPostionMap[slotId];
}
