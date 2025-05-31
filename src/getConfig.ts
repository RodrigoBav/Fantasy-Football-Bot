import Config from "./types/config";

export default function getConfig(): Config {
  return require(`${process.cwd()}/env.json`);
}
