import Handler from "../../types/discord/Handler";
import path from "path";
import { glob } from "glob";
import DiscordClient from "./Client";
import DiscordEvent from "./Event";
import DiscordCommand from "./Command";
import DiscordSubCommand from "./SubCommand";
import DiscordMessage from "./Message";
import MessageOccurrance from "../../types/discord/MessageOccurrence";
import CommandCategory from "../../types/discord/CommandCategory";
import isTestingServer from "../../getIsTestingServer";

export default class DiscordEventHandler implements Handler {
  client: DiscordClient;

  constructor(client: DiscordClient) {
    this.client = client;
  }

  async loadEvents() {
    const files = (await glob(`build/app/discord-bot/events/**/*.js`)).map((filePath) => path.resolve(filePath));

    files.map(async (file: string) => {
      const event: DiscordEvent = new (await import(file)).default(this.client);

      if (!event.name) {
        return (
          delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have a name`)
        );
      }

      const execute = (...args: any) => event.execute(...args);

      if (event.once) {
        //@ts-ignore
        this.client.once(event.name, execute);
      } else {
        //@ts-ignore
        this.client.on(event.name, execute);
      }

      return delete require.cache[require.resolve(file)];
    });
  }

  async loadCommands() {
    const files = (await glob(`build/app/discord-bot/commands/**/*.js`)).map((filePath) => path.resolve(filePath));

    files.map(async (file: string) => {
      const command: DiscordCommand | DiscordSubCommand = new (await import(file)).default(this.client);

      if (!command.name) {
        return (
          delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have a name`)
        );
      }

      if (
        command.category === CommandCategory.ignore ||
        (command.category === CommandCategory.test && !isTestingServer())
      ) {
        return delete require.cache[require.resolve(file)];
      }

      if (file.split("/").pop()?.split(".")[2]) {
        return this.client.subCommands.set(command.name, command as DiscordSubCommand);
      }

      this.client.commands.set(command.name, command as DiscordCommand);

      return delete require.cache[require.resolve(file)];
    });
  }

  async loadMessages() {
    const files = (await glob(`build/app/discord-bot/messages/**/*.js`)).map((filePath) => path.resolve(filePath));

    files.map(async (file: string) => {
      const message: DiscordMessage = new (await import(file)).default(this.client);

      if (!message.name) {
        return (
          delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have a name`)
        );
      }

      if (message.disabled === true) {
        return delete require.cache[require.resolve(file)];
      }

      const execute = (...args: any) => message.execute(...args);

      if (message.occurrence === MessageOccurrance.onEvent) {
        //@ts-ignore
        this.client.on(message.event, execute);
      } else if (message.occurrence === MessageOccurrance.repeatOnSchedule) {
      }

      return delete require.cache[require.resolve(file)];
    });
  }
}
