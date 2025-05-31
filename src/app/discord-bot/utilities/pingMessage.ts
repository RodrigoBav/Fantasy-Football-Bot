import { Message, TextChannel } from "discord.js";
import { DiscordConfig } from "../../../types/config";
import getConfig from "../../../getConfig";

const { danielUid, rodiUid }: DiscordConfig = getConfig().discordConfig;

interface PingMessageParams {
  message: string;
  discordChannel: TextChannel;
  userIds?: string[];
}

export default async function pingMessage({
  message,
  discordChannel,
  userIds = [danielUid, rodiUid]
}: PingMessageParams): Promise<Message> {
  var pingString = "";

  userIds.forEach((userId) => (pingString = pingString + `<@${userId}> `));

  return await discordChannel.send(pingString + message);
}
