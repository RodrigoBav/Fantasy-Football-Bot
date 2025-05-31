import { ChatInputCommandInteraction } from "discord.js";
import CustomClient from "./CustomClient";
import CommandCategory from "./CommandCategory";

export interface SubCommandOptions {
  name: string;
  category: CommandCategory;
}

export default interface SubCommand extends SubCommandOptions {
  client: CustomClient;
  execute(interaction: ChatInputCommandInteraction): void;
}
