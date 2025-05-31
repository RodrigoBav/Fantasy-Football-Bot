import { orderBy, uniqBy } from "lodash";
import WeeklySchedule from "../../../types/endpoints/weeklySchedule/WeeklySchedule";
import { Moment } from "moment-timezone";
import moment from "moment-timezone";

export interface UniqueDateTime {
  timeId: string;
  momentTime: Moment;
}

export default function getUniqueGameTimes(schedule: WeeklySchedule): UniqueDateTime[] {
  const allStartTimes = schedule.matches
    ?.map(({ matchDetails }): UniqueDateTime | undefined => {
      const startDateTime = matchDetails?.startDateTime;

      if (!startDateTime) {
        return;
      }

      return {
        timeId: startDateTime,
        momentTime: moment(startDateTime)
      };
    })
    .filter((time) => time !== undefined);

  const uniqueStartTimes = uniqBy(allStartTimes, ({ timeId }) => timeId);

  return orderBy(uniqueStartTimes, ({ momentTime }) => momentTime.format("YYYYMMDDhmm"));
}
