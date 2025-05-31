import { Collection } from "discord.js";
import DiscordSubCommand from "../../app/discord-bot/SubCommand";
import DiscordCommand from "../../app/discord-bot/Command";
import { DiscordConfig } from "../config";

export default interface CustomClient {
  config: DiscordConfig;
  commands: Collection<string, DiscordCommand>;
  subCommands: Collection<string, DiscordSubCommand>;
  cooldowns: Collection<string, Collection<string, number>>;
  init(): void;
  loadHandlers(): void;
}
