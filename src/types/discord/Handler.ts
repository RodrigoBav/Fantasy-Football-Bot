export default interface Handler {
  loadEvents(): void;
  loadCommands(): void;
  loadMessages(): void;
}
