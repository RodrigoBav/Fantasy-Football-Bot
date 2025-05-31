import { ChatInputCommandInteraction, Collection, EmbedBuilder, Events } from "discord.js";
import DiscordEvent from "../../Event";
import DiscordClient from "../../Client";
import DiscordCommand from "../../Command";

export default class ComamndHandler extends DiscordEvent {
  constructor(client: DiscordClient) {
    super(client, {
      name: Events.InteractionCreate,
      description: "Command handler event",
      once: false
    });
  }

  execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const command: DiscordCommand = this.client.commands.get(interaction.commandName)!;

    if (!command) {
      //@ts-ignore
      return (
        //@ts-ignore
        interaction.reply({
          content: "This command does not exist!",
          ephemeral: true
        }) && this.client.commands.delete(interaction.commandName)
      );
    }

    const { cooldowns } = this.client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name)!;
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(interaction.user.id) && now < (timestamps.get(interaction.user.id) || 0) + cooldownAmount) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `❌ Please wait another \`${(((timestamps.get(interaction.user.id) || 0) + cooldownAmount - now) / 1000).toFixed(1)}\` seconds to run this command again!`
            )
        ],
        ephemeral: true
      });
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      const subCommandGroup = interaction.options.getSubcommandGroup(false);
      const subCommands = `${interaction.commandName}${subCommandGroup ? `.${subCommandGroup}` : ""}.${interaction.options.getSubcommand(false) || ""}`;

      return this.client.subCommands.get(subCommands)?.execute(interaction) || command.execute(interaction);
    } catch (e) {
      console.log(command);
      console.log(e);
    }
  }
}
