import Player from "../Player";
import ScheduleTeamOverview from "../ScheduleTeamOverview";
import TeamScheduleResponse from "../TeamScheduleResponse";
import buildPlayer from "./buildPlayer";

export default function buildMatchupTeamOverview(team?: TeamScheduleResponse): ScheduleTeamOverview | undefined {
  if (!team) {
    return;
  }

  const {
    teamId: responseTeamId,
    totalPoints,
    totalPointsLive,
    totalProjectedPointsLive,
    rosterForCurrentScoringPeriod,
    rosterForMatchupPeriod
  } = team;

  const totalRoster = rosterForCurrentScoringPeriod?.entries?.map(buildPlayer);

  return {
    teamId: responseTeamId?.toString(),
    scoreBreakdown: {
      securedPointTotal: totalPoints,
      weeklyPointTotal: totalPointsLive,
      projectedWeeklyPointTotal: totalProjectedPointsLive
    },
    totalRoster,
    activeAndSecuredRoster: rosterForMatchupPeriod?.entries?.map((playerResponse) => {
      const player = buildPlayer(playerResponse);
      return augmentActiveAndSecuredRosterPlayerPositionData(player, totalRoster);
    })
  };
}

function augmentActiveAndSecuredRosterPlayerPositionData(player: Player, totalRoster?: Player[]): Player {
  if (!totalRoster || totalRoster.length === 0) {
    return player;
  }

  const playerFromTotalRoster = totalRoster.find(({ id }) => id && id === player.id);

  return {
    ...player,
    positionData: playerFromTotalRoster?.positionData
  };
}
