import { Collection, Events, REST, Routes } from "discord.js";
import DiscordClient from "../../Client";
import DiscordEvent from "../../Event";
import DiscordCommand from "../../Command";

export default class ReadyEvent extends DiscordEvent {
  constructor(client: DiscordClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Ready Event",
      once: true
    });
  }

  async execute() {
    console.log(`${this.client.user?.tag} is now ready!`);

    const commands: object[] = this.getJson(this.client.commands);

    const rest = new REST().setToken(this.client.config.token);

    const setCommands: any = await rest.put(
      Routes.applicationGuildCommands(this.client.config.discordClientId, this.client.config.guildId),
      {
        body: commands
      }
    );

    console.log(`Successfully set ${setCommands.length} commands!`);

    // The Lab server ID
    /* Don't really need this anymore, leaving it for fun
    if (!isTestingServer(this.client.config)) {
      const fantasyChannel = (await this.client.channels.fetch(this.client.config.reportingChannelId)) as TextChannel;

      if (fantasyChannel) {
        fantasyChannel.send("The GOAT is here");
      }
    }
    */
  }

  private getJson(commands: Collection<string, DiscordCommand>): object[] {
    const data: object[] = [];

    commands.forEach(({ name, desciption, options, defaultMemberPermissions, dmPermissions }) => {
      data.push({
        name,
        description: desciption,
        options,
        defaultMemberPermissions: defaultMemberPermissions.toString(),
        dmPermissions
      });
    });

    return data;
  }
}
