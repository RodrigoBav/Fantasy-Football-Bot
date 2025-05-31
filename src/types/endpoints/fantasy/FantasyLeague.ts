import Matchup from "./Matchup";
import Team from "./Team";

export default interface FantasyLeague {
  leagueId?: string;
  teams?: Team[];
  schedule?: Matchup[];
}
