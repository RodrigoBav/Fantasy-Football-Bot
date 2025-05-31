import DiscordCommand from "../Command";
import DiscordClient from "../Client";
import CommandCategory from "../../../types/discord/CommandCategory";
import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import getMatchupSummary from "../../fantasy/matchup-summary/getMatchupSummary";

export default class SummaryCommand extends DiscordCommand {
  constructor(client: DiscordClient) {
    super(client, {
      name: "summary",
      desciption: "Weekly fantasy matchup summary",
      category: CommandCategory.enable,
      defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands,
      dmPermissions: false,
      cooldown: 3,
      options: []
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    getMatchupSummary(interaction);
  }
}
