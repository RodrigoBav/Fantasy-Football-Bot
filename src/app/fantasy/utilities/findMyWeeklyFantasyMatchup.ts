import getConfig from "../../../getConfig";
import { FantasyConfig } from "../../../types/config";
import Matchup from "../../../types/endpoints/fantasy/Matchup";
import getSeasonWeek from "./getSeasonWeek";
import getWeeklyFantasyMatchups from "./getWeeklyFantasyMatchups";

const config: FantasyConfig = getConfig().fantasyConfig;

export default function findMyWeeklyFantasyMatchup(
  fanstaySchedule: Matchup[] | undefined,
  week: number = getSeasonWeek()
): Matchup | undefined {
  const weeklyMatchups = getWeeklyFantasyMatchups(fanstaySchedule, week);

  return weeklyMatchups.find(({ home, away }) => home?.teamId === config.teamId || away?.teamId === config.teamId);
}
