import PlayerPosition from "../../../types/endpoints/fantasy/PlayerPosition";
import PlayerPositionData from "../../../types/endpoints/fantasy/PlayerPositionData";

const positionAbbreviationMap: Partial<Record<PlayerPosition, string>> = {
  [PlayerPosition.quarterBack]: "QB",
  [PlayerPosition.runningBack]: "RB",
  [PlayerPosition.wideReciever]: "WR",
  [PlayerPosition.tightEnd]: "TE",
  [PlayerPosition.flex]: "FLEX",
  [PlayerPosition.kicker]: "K"
};

export default function getPositionAbbreviation(positionData?: PlayerPositionData): string | undefined {
  if (!positionData || !positionData.fantasyPosition) {
    return;
  }

  const { fantasyPosition } = positionData;

  return positionAbbreviationMap[fantasyPosition];
}
