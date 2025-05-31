import { Events } from "discord.js";
import CustomClient from "./CustomClient";
import MessageOccurrance from "./MessageOccurrence";

export interface MessageOptions {
  name: string;
  description: string;
  disabled?: boolean;
  occurrence: MessageOccurrance;
  cronSchedule?: string;
  event?: Events;
}

export default interface CustomMessage extends MessageOptions {
  client: CustomClient;
  execute(): void;
}
