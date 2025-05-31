import { Events } from "discord.js";
import DiscordClient from "./Client";
import Event, { EventOptions } from "../../types/discord/Event";

export default class DiscordEvent implements Event {
  client: DiscordClient;
  name: Events;
  description: string;
  once: boolean;

  constructor(client: DiscordClient, { name, description, once }: EventOptions) {
    this.client = client;
    this.name = name;
    this.description = description;
    this.once = once;
  }

  execute(...args: any): void {}
}
