export const daysCompress = (data) => {
  let i = 0,
    j = 0;
  let newDays = [];

  while (i < data.length) {
    j = i;

    while (j + 1 < data.length && data[j + 1].value == data[j].value + 1) {
      j++;
    }

    if (i == j) {
      newDays.push(`${data[i].label}, `);
      i++;
    } else {
      newDays.push(`${data[i].label} - ${data[j].label}, `);
      i = j + 1;
    }
  }
  return newDays;
};
