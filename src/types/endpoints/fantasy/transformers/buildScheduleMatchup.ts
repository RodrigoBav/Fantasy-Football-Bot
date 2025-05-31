import Matchup from "../Matchup";
import ScheduleResponse from "../ScheduleResponse";
import buildMatchupTeamOverview from "./buildMatchupTeamOverview";

export default function buildScheduleMatchup(scheduleResponse: ScheduleResponse): Matchup {
  const { id: scheduleId, matchupPeriodId, home, away } = scheduleResponse;

  return {
    id: scheduleId?.toString(),
    week: matchupPeriodId,
    home: buildMatchupTeamOverview(home),
    away: buildMatchupTeamOverview(away)
  };
}
