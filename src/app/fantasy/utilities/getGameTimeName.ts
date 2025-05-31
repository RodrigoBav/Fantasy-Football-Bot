import { inRange } from "lodash";
import { Moment } from "moment-timezone";

export default function getGameTimeName(startDateTime: Moment): string {
  const formattedStartTime = startDateTime.format("MMMM Do, YYYY. dddd ");

  const timeOfDayNickname = getTimeOfDayNickname(startDateTime) + " ";

  return formattedStartTime + timeOfDayNickname + "Football";
}

function getTimeOfDayNickname(startDateTime: Moment): string {
  const startTimeHour = startDateTime.hours();

  if (inRange(startTimeHour, 0, 11)) {
    return "Morning";
  } else if (inRange(startTimeHour, 11, 14)) {
    return "Noon";
  } else if (inRange(startTimeHour, 14, 18)) {
    return "Afternoon";
  } else {
    return "Night";
  }
}
