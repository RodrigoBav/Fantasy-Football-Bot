import { ChatInputCommandInteraction, AutocompleteInteraction } from "discord.js";
import Command, { CommandOptions } from "../../types/discord/Command";
import CommandCategory from "../../types/discord/CommandCategory";
import DiscordClient from "./Client";

export default class DiscordCommand implements Command {
  client: DiscordClient;
  name: string;
  desciption: string;
  category: CommandCategory;
  options: object;
  defaultMemberPermissions: bigint;
  dmPermissions: boolean;
  cooldown: number;

  constructor(
    client: DiscordClient,
    { name, desciption, category, options, defaultMemberPermissions, dmPermissions, cooldown }: CommandOptions
  ) {
    this.client = client;
    this.name = name;
    this.desciption = desciption;
    this.category = category;
    this.options = options;
    this.defaultMemberPermissions = defaultMemberPermissions;
    this.dmPermissions = dmPermissions;
    this.cooldown = cooldown;
  }

  execute(interaction: ChatInputCommandInteraction): void {
    throw new Error("Method not implemented.");
  }
  autoComplete(interaction: AutocompleteInteraction): void {
    throw new Error("Method not implemented.");
  }
}
