export interface DiscordConfig {
  token: string;
  discordClientId: string;
  guildId: string;
  reportingChannelId: string;
  danielUid: string;
  rodiUid: string;
}

export interface FantasyConfig {
  swid: string;
  espnS2: string;
  seasonId: string;
  leagueId: string;
  teamId: string;
  referenceSeasonStartDate: string;
}

export interface DatabaseConfig {
  username: string;
  password: string;
}

export default interface Config {
  discordConfig: DiscordConfig;
  fantasyConfig: FantasyConfig;
  databaseConfig: DatabaseConfig;
  testServerId: string;
}
