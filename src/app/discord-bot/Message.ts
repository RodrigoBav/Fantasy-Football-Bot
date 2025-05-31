import { Events } from "discord.js";
import CustomMessage, { MessageOptions } from "../../types/discord/CustomMessage";
import MessageOccurrance from "../../types/discord/MessageOccurrence";
import DiscordClient from "./Client";

export default class DiscordMessage implements CustomMessage {
  client: DiscordClient;
  name: string;
  description: string;
  disabled?: boolean;
  occurrence: MessageOccurrance;
  cronSchedule?: string;
  event?: Events;

  constructor(client: DiscordClient, { name, description, disabled, occurrence, cronSchedule, event }: MessageOptions) {
    this.client = client;
    this.name = name;
    this.disabled = disabled ?? false;
    this.description = description;
    this.occurrence = occurrence;
    this.cronSchedule = cronSchedule;
    this.event = event;
  }

  execute(...args: any): void {}
}
