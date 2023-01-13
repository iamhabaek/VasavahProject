export const filterTimeSlots = (arr) => {
  const filtered = arr.reduce((acc, current) => {
    const x = acc.find((item) => item.value === current.value);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  console.log(filtered);
  return filtered;
};
const slot = [
  { start: "6:00 AM", value: 6 },
  { start: "10:00 AM", value: 10 },
  { start: "11:00 AM", value: 11 },
  { start: "12:00 PM", value: 12 },
  { start: "1:00 PM", value: 13 },
  { start: "2:00 PM", value: 14 },
  { start: "3:00 PM", value: 15 },
  { start: "4:00 PM", value: 16 },
  { start: "5:00 PM", value: 17 },
  { start: "6:00 PM", value: 18 },
  { start: "7:00 PM", value: 19 },
  { start: "8:00 PM", value: 20 },
  { start: "9:00 PM", value: 21 },
][
  ({ end: "7:00 AM", value: 7 },
  { end: "11:00 AM", value: 11 },
  { end: "12:00 PM", value: 12 },
  { end: "1:00 PM", value: 13 },
  { end: "2:00 PM", value: 14 },
  { end: "3:00 PM", value: 15 },
  { end: "4:00 PM", value: 16 },
  { end: "5:00 PM", value: 17 },
  { end: "6:00 PM", value: 18 },
  { end: "7:00 PM", value: 19 },
  { end: "8:00 PM", value: 20 },
  { end: "9:00 PM", value: 21 },
  { end: "10:00 PM", value: 22 })
];
