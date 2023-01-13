import {
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  addMinutes,
  setMilliseconds,
  getHours,
  format,
} from "date-fns";
export const generateTime = (startTime, endTime) => {
  const setTime = (x, h = 0, m = 0, s = 0, ms = 0) =>
    setHours(setMinutes(setSeconds(setMilliseconds(x, ms), s), m), h);
  const from = setTime(new Date(), startTime);
  const to = setTime(new Date(), endTime + 1);
  const step = (x) => addMinutes(x, 60);

  let blocks = [];
  let cursor = from;

  while (isBefore(cursor, to)) {
    blocks.push({ time: format(cursor, "h:mm a"), value: getHours(cursor) });

    cursor = step(cursor);
  }

  return blocks;
};
