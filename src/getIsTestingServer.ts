import getConfig from "./getConfig";
import { DiscordConfig } from "./types/config";

const {discordConfig, testServerId} = getConfig()

export default function isTestingServer(discConfig?: DiscordConfig): boolean {
  const {guildId}: DiscordConfig = !discConfig ? discordConfig : discConfig;

  return guildId === testServerId;
}
