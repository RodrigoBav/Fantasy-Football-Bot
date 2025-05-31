import DiscordCommand from "../Command";
import DiscordClient from "../Client";
import CommandCategory from "../../../types/discord/CommandCategory";
import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import getPlayerScoreBreakdown from "../../fantasy/player-breakdown/getPlayerScoreBreakdown";

export default class PlayerScoreBreakdownCommand extends DiscordCommand {
  constructor(client: DiscordClient) {
    super(client, {
      name: "player-breakdown",
      desciption: "Break's down a selected players performance this week",
      category: CommandCategory.enable,
      defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands,
      dmPermissions: false,
      cooldown: 3,
      options: []
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    getPlayerScoreBreakdown(interaction);
  }
}
