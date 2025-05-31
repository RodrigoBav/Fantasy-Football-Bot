export default interface WebClientInterface {
  get(url: string, additionalOptions?: RequestInit): Promise<string | undefined>;
}
