import getConfig from "../../../getConfig";
import { FantasyConfig } from "../../../types/config";
import Matchup from "../../../types/endpoints/fantasy/Matchup";
import ScheduleTeamOverview from "../../../types/endpoints/fantasy/ScheduleTeamOverview";

const config: FantasyConfig = getConfig().fantasyConfig;

export interface SortedFantasyMatchupTeams {
  myTeam?: ScheduleTeamOverview;
  opponentTeam?: ScheduleTeamOverview;
}

export default function findMyTeamInMatchup({ home, away }: Matchup): SortedFantasyMatchupTeams {
  if (home?.teamId === config.teamId) {
    return { myTeam: home, opponentTeam: away };
  } else {
    return { myTeam: away, opponentTeam: home };
  }
}
