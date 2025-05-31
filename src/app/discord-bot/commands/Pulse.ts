import DiscordCommand from "../Command";
import DiscordClient from "../Client";
import CommandCategory from "../../../types/discord/CommandCategory";
import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";

export default class PulseCommand extends DiscordCommand {
  constructor(client: DiscordClient) {
    super(client, {
      name: "pulse",
      desciption: "Checks Jerry's pulse",
      category: CommandCategory.ignore,
      defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands,
      dmPermissions: false,
      cooldown: 3,
      options: []
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: "I'm Awake!",
      ephemeral: true
    });
  }
}
