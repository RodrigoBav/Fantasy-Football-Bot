import Player from "../../../types/endpoints/fantasy/Player";

interface GetPlayersByTeamIdParams {
  nflTeamId?: string;
  playerList?: Player[];
}

export default function getPlayersByTeamId({ nflTeamId, playerList = [] }: GetPlayersByTeamIdParams): Player[] {
  if (!nflTeamId || playerList.length === 0) {
    return [];
  }

  return playerList.filter(({ nflTeamData }) => {
    return nflTeamData?.id === nflTeamId;
  });
}
