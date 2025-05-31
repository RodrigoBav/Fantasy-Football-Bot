import Matchup from "../../../types/endpoints/fantasy/Matchup";
import getSeasonWeek from "./getSeasonWeek";

export default function (fanstaySchedule: Matchup[] | undefined, week = getSeasonWeek()): Matchup[] {
  return (
    fanstaySchedule
      ?.filter(({ week: fantasyWeek }) => fantasyWeek === week)
      .filter((matchup) => matchup !== undefined) ?? []
  );
}
