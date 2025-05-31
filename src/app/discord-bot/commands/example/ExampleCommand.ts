import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import CommandCategory from "../../../../types/discord/CommandCategory";
import DiscordClient from "../../Client";
import DiscordCommand from "../../Command";

export default class ExampleCommand extends DiscordCommand {
  constructor(client: DiscordClient) {
    super(client, {
      name: "test",
      desciption: "My test command",
      category: CommandCategory.ignore,
      defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands,
      dmPermissions: false,
      cooldown: 3,
      options: [
        {
          name: "one",
          description: "This is the first option",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "two",
          description: "This is the first option",
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    });
  }

  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: "Text command has been ran!",
      ephemeral: true
    });
  }
}
