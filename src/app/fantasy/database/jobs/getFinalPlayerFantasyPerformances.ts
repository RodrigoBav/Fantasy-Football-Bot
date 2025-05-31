import ModelNames from "../../../../types/database/ModelNames";
import DataBaseClient from "../../DataBaseClient";
import getFantasyLeague from "../../endpoints/getFantasyLeague";
import retryCall from "../../endpoints/retryCall";
import findMyTeamInMatchup from "../../utilities/findMyTeamInMatchup";
import findMyWeeklyFantasyMatchup from "../../utilities/findMyWeeklyFantasyMatchup";
import getWeeklyPlayerPerformanceId from "../getWeeklyPlayerPerformanceId";

export default async function getFinalPlayerFantasyPerformances() {
  const fantasyLeague = await retryCall(getFantasyLeague);

  if (!fantasyLeague) {
    return;
  }

  const { myTeam } = findMyTeamInMatchup(findMyWeeklyFantasyMatchup(fantasyLeague.schedule) ?? {});

  if (!myTeam) {
    return;
  }

  const { activeAndSecuredRoster } = myTeam;

  if (!activeAndSecuredRoster || activeAndSecuredRoster.length === 0) {
    return;
  }

  new DataBaseClient().update(ModelNames.weeklyPlayerPerformances, getWeeklyPlayerPerformanceId(), {
    data: activeAndSecuredRoster,
    upsert: true
  });
}
