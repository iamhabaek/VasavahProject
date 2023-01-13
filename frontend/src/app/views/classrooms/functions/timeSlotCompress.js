export const timeSlotCompress = (timeSlots, n) => {
  let i = 0,
    j = 0;
  let newTimeSlots = [];

  while (i < n) {
    j = i;

    while (j + 1 < n && timeSlots[j + 1].value == timeSlots[j].value + 1) {
      j++;
    }

    if (i == j) {
      newTimeSlots.push(`${timeSlots[i].start} - ${timeSlots[i].end}, `);
      i++;
    } else {
      newTimeSlots.push(`${timeSlots[i].start} - ${timeSlots[j].end}, `);
      i = j + 1;
    }
  }
  return newTimeSlots;
};
