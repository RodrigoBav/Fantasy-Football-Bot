import moment from "moment-timezone";
import { FantasyConfig } from "../../../types/config";
import getConfig from "../../../getConfig";

const config: FantasyConfig = getConfig().fantasyConfig;

export default function getSeasonWeek(): number {
  const currentData = moment();
  const referenceStartDate = moment(config.referenceSeasonStartDate, "YYYY-MM-DD");

  return currentData.diff(referenceStartDate, "week");
}
