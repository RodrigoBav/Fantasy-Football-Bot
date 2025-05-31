import Player from "../Player";
import PlayerEntryResponse from "../PlayerEntryResponse";
import PlayerPoolEntryResponse from "../PlayerPoolEntryResponse";
import PlayerPosition from "../PlayerPosition";
import PlayerResponse from "../PlayerResponse";
import buildPlayerStats from "./buildPlayerStats";
import buildPositionFromSlotId from "./buildPostionFromSlotId";
import buildNFLTeamDataFromTeamsId from "../../common/transformers/buildNFLTeamDataFromTeamId";
import { find } from "lodash";

export default function buildPlayer({
  playerId,
  lineupSlotId,
  injuryStatus,
  playerPoolEntry
}: PlayerEntryResponse): Player {
  const slotId = lineupSlotId?.toString();
  const position = buildPositionFromSlotId(slotId);
  const poolEntryData = playerDataFromPoolEntry(playerPoolEntry) || {};

  return {
    id: playerId?.toString(),
    isStarter:
      !(position === PlayerPosition.injuryReserve || position === PlayerPosition.bench) &&
      playerPoolEntry?.player?.injured !== true,
    injuryStatus,
    ...poolEntryData,
    positionData: {
      ...poolEntryData.positionData,
      fantasyPositionId: slotId,
      fantasyPosition:
        position === PlayerPosition.flex
          ? getPositionFromFlex(poolEntryData.positionData?.eligibleNFLPositions)
          : position
    }
  };
}

function getPositionFromFlex(eligibleNFLPositions: string[] | undefined): PlayerPosition {
  const flexPositionId = find(eligibleNFLPositions, (positionId) => parseInt(positionId) % 2 === 0);

  return buildPositionFromSlotId(flexPositionId) ?? PlayerPosition.flex;
}

function playerDataFromPoolEntry(playerPoolEntry?: PlayerPoolEntryResponse): Partial<Player> | undefined {
  if (!playerPoolEntry) {
    return;
  }

  const { player, appliedStatTotal } = playerPoolEntry;
  const playerData = playerDataFromPlayerResponse(player) || {};

  return {
    nflTeamData: buildNFLTeamDataFromTeamsId(player?.proTeamId),
    ...playerData,
    pointBreakdown: {
      ...playerData?.pointBreakdown,
      actualPoints: appliedStatTotal
    }
  };
}

function playerDataFromPlayerResponse(playerResponse?: PlayerResponse): Partial<Player> | undefined {
  if (!playerResponse) {
    return;
  }

  const { id: playerId, stats, eligibleSlots, active, firstName, lastName, fullName, jersey } = playerResponse;
  const playerStatsResponse = stats && stats.length >= 1 ? stats[0] : undefined;

  const eligibleNFLPositions = eligibleSlots?.map((slotId) => slotId.toString());

  return {
    id: playerId?.toString(),
    active,
    firstName,
    lastName,
    fullName,
    jersey,
    positionData: {
      eligibleNFLPositions
    },
    pointBreakdown: {
      projectedPoints: playerStatsResponse?.appliedTotal,
      projectedBoomPoints: playerStatsResponse?.appliedTotalCeiling
    },
    stats: buildPlayerStats(playerStatsResponse)
  };
}
