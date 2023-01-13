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
  const to = setTime(new Date(), endTime);
  const step = (x) => addMinutes(x, 60);

  let blocks = [];
  let cursor = from;
  let inc = 1;
  while (isBefore(cursor, to)) {
    blocks.push({
      start: format(cursor, "h:mm a"),
      end: format(step(cursor), "h:mm a"),
      value: inc++,
    });

    cursor = step(cursor);
  }

  return blocks;
};
