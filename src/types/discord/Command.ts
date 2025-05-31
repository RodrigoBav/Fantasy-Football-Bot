import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import CustomClient from "./CustomClient";
import CommandCategory from "./CommandCategory";

export interface CommandOptions {
  name: string;
  desciption: string;
  category: CommandCategory;
  options: object;
  defaultMemberPermissions: bigint;
  dmPermissions: boolean;
  cooldown: number;
}

export default interface Command extends CommandOptions {
  client: CustomClient;
  execute(interaction: ChatInputCommandInteraction): void;
  autoComplete(interaction: AutocompleteInteraction): void;
}
