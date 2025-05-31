import { ChatInputCommandInteraction } from "discord.js";
import DiscordClient from "../../Client";
import DiscordSubCommand from "../../SubCommand";
import CommandCategory from "../../../../types/discord/CommandCategory";

export default class ExampleSubCommandOne extends DiscordSubCommand {
  constructor(client: DiscordClient) {
    super(client, {
      name: "test.one",
      category: CommandCategory.ignore
    });
  }

  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: "Text one command has been ran!",
      ephemeral: true
    });
  }
}
