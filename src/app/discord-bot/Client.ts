import { Client, Collection } from "discord.js";
import CustomClient from "../../types/discord/CustomClient";
import DiscordEventHandler from "./Handler";
import DiscordCommand from "./Command";
import DiscordSubCommand from "./SubCommand";
import getConfig from "../../getConfig";
import { DiscordConfig } from "../../types/config";

export default class DiscordClient extends Client implements CustomClient {
  handler: DiscordEventHandler;
  config: DiscordConfig;
  commands: Collection<string, DiscordCommand>;
  subCommands: Collection<string, DiscordSubCommand>;
  cooldowns: Collection<string, Collection<string, number>>;

  constructor() {
    super({ intents: [] });

    this.config = getConfig().discordConfig;
    this.handler = new DiscordEventHandler(this);
    this.commands = new Collection();
    this.subCommands = new Collection();
    this.cooldowns = new Collection();
  }

  init(): void {
    this.loadHandlers();

    this.login(this.config.token).catch((err) => console.error(err));
  }

  loadHandlers(): void {
    this.handler.loadEvents();
    this.handler.loadCommands();
    this.handler.loadMessages();
  }
}
