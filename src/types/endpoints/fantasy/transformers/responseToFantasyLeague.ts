import FantasyLeague from "../FantasyLeague";
import FantasyLeagueResponse from "../FantasyLeagueResponse";
import buildScheduleMatchup from "./buildScheduleMatchup";
import buildTeam from "./buildTeam";

export default function transformResponseToFantasyLeague(response?: FantasyLeagueResponse): FantasyLeague | undefined {
  if (!response) {
    return;
  }

  const { id, members, teams, schedule } = response;

  return {
    leagueId: id?.toString(),
    teams: members?.map((member) => buildTeam(member, teams))?.filter((team) => team !== undefined),
    schedule: schedule.map(buildScheduleMatchup)
  };
}
