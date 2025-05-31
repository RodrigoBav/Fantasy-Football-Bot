import { ChatInputCommandInteraction, PermissionsBitField, TextChannel } from "discord.js";
import DiscordCommand from "../../Command";
import DiscordClient from "../../Client";
import CommandCategory from "../../../../types/discord/CommandCategory";

export default class SendMessageCommand extends DiscordCommand {
  constructor(client: DiscordClient) {
    super(client, {
      name: "message",
      desciption: "Sends a message to a specified channel",
      category: CommandCategory.ignore,
      defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands,
      dmPermissions: false,
      cooldown: 3,
      options: []
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    console.log("there was an interaction", this.client.config.reportingChannelId);

    const fantasyChannel = (await this.client.channels.fetch(this.client.config.reportingChannelId)) as TextChannel;

    if (fantasyChannel) {
      console.log(fantasyChannel.name);
      fantasyChannel.send("SAM IS SO SUPER HOT AND COOL");
    }
  }
}
