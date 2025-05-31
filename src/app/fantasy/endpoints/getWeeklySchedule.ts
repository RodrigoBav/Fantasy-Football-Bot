import WebClient from "../WebClient";
import getSeasonWeek from "../utilities/getSeasonWeek";
import WeeklyScheduleResponse from "../../../types/endpoints/weeklySchedule/WeeklyScheduleResponse";
import transformResponseToWeeklySchedule from "../../../types/endpoints/weeklySchedule/transformers/responseToWeeklySchedule";
import WeeklySchedule from "../../../types/endpoints/weeklySchedule/WeeklySchedule";
import getConfig from "../../../getConfig";
import DataBaseClient from "../DataBaseClient";
import ModelNames from "../../../types/database/ModelNames";
import getWeeklyNFLScheduleId from "../database/getWeeklyNFLScheduleId";

export default async function getWeeklySchedule(week: number = getSeasonWeek()): Promise<WeeklySchedule | undefined> {
  const dbClient = new DataBaseClient();
  const cachedSchedule: WeeklySchedule | undefined = await dbClient.get(
    ModelNames.weeklyNFLSchedule,
    getWeeklyNFLScheduleId()
  );

  if (cachedSchedule) {
    return cachedSchedule;
  }

  const config = getConfig().fantasyConfig;
  const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?year=${config.seasonId}&week=${week}`;

  const response: WeeklyScheduleResponse | undefined = await new WebClient().get(url);

  if (!response) {
    return;
  }

  const schedule = transformResponseToWeeklySchedule(response);

  const ttl = 14 * 24 * 60 * 60; // 14 days converted to seconds
  dbClient.set(ModelNames.weeklyNFLSchedule, getWeeklyNFLScheduleId(), { data: schedule, ttl });

  return schedule;
}
