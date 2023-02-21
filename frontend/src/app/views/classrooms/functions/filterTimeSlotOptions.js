import { generateTimeSlots } from "./generateTime";
// START TIME OPTIONS
export const filterStartTime = (
  roomId,
  startDate,
  endDate,
  daysData,
  schedules,
  startTime,
  endTime
) => {
  const scheduleFilterForClassroom = schedules.filter(
    (slot) => slot.resourceId === roomId.value
  );
  let days = [];
  daysData && daysData.map((day) => days.push(day.label));
  function filterSchedules(schedule, startDate, endDate, days) {
    const allDaysSlots = schedule.filter((slot) => {
      return (
        slot.startDate <= new Date(endDate).getTime() &&
        slot.endDate >= new Date(startDate).getTime() &&
        days.every((day) => slot.days.includes(day))
      );
    });
    // Return if there is an all day schedule that corresponds to the selected days
    if (allDaysSlots.length > 0) {
      return allDaysSlots;
    } else {
      // Return if there is no all day schedule that corresponds to the selected days
      const notAllDaySlots = scheduleFilterForClassroom.filter((slot) => {
        return (
          slot.startDate <= new Date(endDate).getTime() &&
          slot.endDate >= new Date(startDate).getTime() &&
          days.some((day) => slot.days.includes(day))
        );
      });
      // Check for overlaps
      const filterOverlaps = notAllDaySlots.filter((slot, index) => {
        return notAllDaySlots.some((s, i) => {
          if (i !== index) {
            return slot.endTime > s.startTime && slot.startTime < s.endTime;
          }
          return false;
        });
      });
      // Reduce the overlapped schedule
      const reduceOverlaps = filterOverlaps.reduce((acc, slot) => {
        const overlappingSlot = acc.find((s) => {
          return slot.endTime > s.startTime && slot.startTime < s.endTime;
        });

        if (overlappingSlot) {
          if (
            slot.endTime < overlappingSlot.endTime ||
            slot.startTime > overlappingSlot.startTime
          ) {
            acc = acc.filter((s) => s !== overlappingSlot);
            acc.push(slot);
          }
        } else {
          acc.push(slot);
        }

        return acc;
      }, []);
      return reduceOverlaps;
    }
  }
  const timeSlots = generateTimeSlots(startTime, endTime);
  // Filter the timeSlots according to the filterSchedules return value
  const filteredTimeSlots = timeSlots.filter((slot) => {
    return filterSchedules(
      scheduleFilterForClassroom,
      startDate,
      endDate,
      days
    ).every((scheduleSlot) => {
      // Check if timeSlot is within range of the schedule start and end time
      // If value is outside of the range of schedule start and end it returns false and doesnt filter the slot
      const isWithinTimeRange =
        slot.value >= scheduleSlot.startTime &&
        slot.value < scheduleSlot.endTime;
      return !isWithinTimeRange;
    });
  });
  return filteredTimeSlots;
};
// END TIME OPTIONS
export const filterEndTime = (
  roomId,
  startDate,
  endDate,
  daysData,
  schedules,
  startTime,
  endTime
) => {
  const scheduleFilterForClassroom = schedules.filter(
    (slot) => slot.resourceId === roomId.value
  );
  let days = [];
  daysData && daysData.map((day) => days.push(day.label));
  function filterSchedules(schedule, startDate, endDate, days) {
    const allDaysSlots = schedule.filter((slot) => {
      return (
        slot.startDate <= new Date(endDate).getTime() &&
        slot.endDate >= new Date(startDate).getTime() &&
        days.every((day) => slot.days.includes(day))
      );
    });

    if (allDaysSlots.length > 0) {
      return allDaysSlots;
    } else {
      const notAllDaySlots = scheduleFilterForClassroom.filter((slot) => {
        return (
          slot.startDate <= new Date(endDate).getTime() &&
          slot.endDate >= new Date(startDate).getTime() &&
          days.some((day) => slot.days.includes(day))
        );
      });
      const filterOverlaps = notAllDaySlots.filter((slot, index) => {
        return notAllDaySlots.some((s, i) => {
          if (i !== index) {
            return slot.endTime > s.startTime && slot.startTime < s.endTime;
          }
          return false;
        });
      });
      const reduceOverlaps = filterOverlaps.reduce((acc, slot) => {
        const overlappingSlot = acc.find((s) => {
          return slot.endTime > s.startTime && slot.startTime < s.endTime;
        });

        if (overlappingSlot) {
          if (
            slot.endTime < overlappingSlot.endTime ||
            slot.startTime > overlappingSlot.startTime
          ) {
            acc = acc.filter((s) => s !== overlappingSlot);
            acc.push(slot);
          }
        } else {
          acc.push(slot);
        }

        return acc;
      }, []);
      return reduceOverlaps;
    }
  }
  const timeSlots = generateTimeSlots(startTime, endTime);
  const filteredTimeSLots = timeSlots.filter((slot) => {
    return filterSchedules(
      scheduleFilterForClassroom,
      startDate,
      endDate,
      days
    ).every((scheduleSlot) => {
      const isWithinTimeRange =
        slot.value > scheduleSlot.startTime &&
        slot.value <= scheduleSlot.endTime;

      return !isWithinTimeRange;
    });
  });
  return filteredTimeSLots;
};
