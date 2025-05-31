import { ChatInputCommandInteraction } from "discord.js";
import DiscordClient from "../../Client";
import DiscordSubCommand from "../../SubCommand";
import CommandCategory from "../../../../types/discord/CommandCategory";

export default class ExampleSubCommandTwo extends DiscordSubCommand {
  constructor(client: DiscordClient) {
    super(client, {
      name: "test.two",
      category: CommandCategory.ignore
    });
  }

  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: "Text two command has been ran!",
      ephemeral: true
    });
  }
}
