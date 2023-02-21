import {
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  addMinutes,
  setMilliseconds,
  format,
} from "date-fns";

export const generateTimeSlots = (startTime, endTime) => {
  const setTime = (x, h = 0, m = 0, s = 0, ms = 0) =>
    setHours(setMinutes(setSeconds(setMilliseconds(x, ms), s), m), h);
  const from = setTime(new Date(), startTime);
  const to = setTime(new Date(), endTime + 1);
  const step = (x) => addMinutes(x, 60);

  let timeSlots = [];
  let cursor = from;
  while (isBefore(cursor, to)) {
    timeSlots.push({
      label: format(cursor, "h:mm a"),
      value: cursor.getHours(),
    });
    cursor = step(cursor);
  }

  return timeSlots;
};
