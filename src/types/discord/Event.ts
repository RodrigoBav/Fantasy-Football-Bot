import { Events } from "discord.js";
import CustomClient from "./CustomClient";

export interface EventOptions {
  name: Events;
  description: string;
  once: boolean;
}

export default interface Event extends EventOptions {
  client: CustomClient;
  execute(): void;
}
