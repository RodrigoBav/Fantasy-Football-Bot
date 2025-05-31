import { ChatInputCommandInteraction } from "discord.js";
import SubCommand, { SubCommandOptions } from "../../types/discord/SubCommand";
import DiscordClient from "./Client";
import CommandCategory from "../../types/discord/CommandCategory";

export default class DiscordSubCommand implements SubCommand {
  client: DiscordClient;
  name: string;
  category: CommandCategory;

  constructor(client: DiscordClient, { name, category }: SubCommandOptions) {
    this.client = client;
    this.name = name;
    this.category = category;
  }

  execute(interaction: ChatInputCommandInteraction): void {
    throw new Error("Method not implemented.");
  }
}
