import getConfig from "../../getConfig";
import WebClientInterface from "../../types/WebClient";

const config = getConfig().fantasyConfig;

export default class WebClient implements WebClientInterface {
  async get(url: string, additionalOptions?: RequestInit): Promise<any> {
    try {
      const response = await fetch(url, buildOptions(additionalOptions));
      const data = await response.json();

      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

function buildOptions(additionalOptions?: RequestInit): RequestInit {
  const defaultHeaders = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    Connection: "keep-alive",
    Accept: "application/json, text/plain, */*",
    cookie: `swid=${config.swid};espn_s2=${config.espnS2}`
  };

  return {
    ...additionalOptions,
    headers: {
      ...defaultHeaders,
      ...additionalOptions?.headers
    }
  };
}
