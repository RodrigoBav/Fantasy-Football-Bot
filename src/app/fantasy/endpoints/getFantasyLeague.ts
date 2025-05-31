import transformResponseToFantasyLeague from "../../../types/endpoints/fantasy/transformers/responseToFantasyLeague";
import FantasyLeague from "../../../types/endpoints/fantasy/FantasyLeague";
import WebClient from "../WebClient";
import FantasyLeagueResponse from "../../../types/endpoints/fantasy/FantasyLeagueResponse";
import { FantasyConfig } from "../../../types/config";
import getConfig from "../../../getConfig";

const config: FantasyConfig = getConfig().fantasyConfig;
const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${config.seasonId}/segments/0/leagues/${config.leagueId}?view=modular&view=mNav&view=mMatchupScore&view=mScoreboard&view=mStatus&view=mSettings&view=mTeam&view=mPendingTransactions`;

export default async function getFantasyLeague(): Promise<FantasyLeague | undefined> {
  const response: FantasyLeagueResponse | undefined = await new WebClient().get(url);

  return transformResponseToFantasyLeague(response);
}
