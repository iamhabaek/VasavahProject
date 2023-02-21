import React from "react";
import dayjs from "dayjs";
import { format } from "date-fns";
export const validations = (values, classrooms, teacher, classroomSlots) => {
  const { startDate, endDate, endTime, startTime, resourceId, days } = values;

  let start = dayjs(startDate);
  let end = dayjs(endDate);
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  let daysOfWeek = [];
  for (
    let currentDate = start;
    currentDate <= end;
    currentDate = dayjs(currentDate).add(1, "day")
  ) {
    let dayOfWeek = dayjs(currentDate).format("dddd");
    daysOfWeek.push(dayOfWeek);
  }
  let conflict =
    startD &&
    endD &&
    days.length > 0 &&
    days.every((value) => daysOfWeek.includes(value.label));
  let daysData = [];
  days && days.map((day) => daysData.push(day.label));
  if (startTime.value && endTime.value && endTime.value < startTime.value) {
    return {
      timeCombination: `Your chosen end time cannot be before your chosen start time`,
    };
  }
  if (startTime.value && endTime.value && endTime.value === startTime.value) {
    return {
      timeCombination:
        "Your chosen start time cannot be the same with your chosen end time",
    };
  }
  if (
    startDate &&
    endDate &&
    new Date(endDate).getTime() < new Date(startDate).getTime()
  ) {
    return {
      dateCombination:
        "Your chosen end date cannot be before your chosen start date",
    };
  }
  if (
    startDate &&
    endDate &&
    new Date(endDate).getTime() === new Date(startDate).getTime()
  ) {
    return {
      dateCombination:
        "Your chosen start date cannot be the same your chosen end date",
    };
  }
  if (startDate && endDate && days && !conflict) {
    return {
      daysCombination: `Your chosen days should correspond to the chosen start and end date`,
    };
  }
  const roomFilter = classroomSlots.filter(
    (slot) =>
      slot.startDate <= new Date(endDate).getTime() &&
      slot.endDate >= new Date(startDate).getTime() &&
      slot.teacher === teacher.id &&
      slot.days.some((day) => daysData.includes(day))
  );
  const slotsFiltered = classroomSlots.filter(
    (slot) => slot.resourceId === resourceId.value
  );
  const scheduleFilter = slotsFiltered.filter(
    (slot) =>
      slot.startDate <= new Date(endDate).getTime() &&
      slot.endDate >= new Date(startDate).getTime() &&
      slot.days.some((day) => daysData.includes(day))
  );
  let conflicts = [];
  let roomConflicts = [];
  scheduleFilter.forEach((s) => {
    if (s.startTime < endTime.value && s.endTime > startTime.value) {
      conflicts.push({
        availableDays: daysData.filter((day) => !s.days.includes(day)),
        conflictingDays: daysData.filter((day) => s.days.includes(day)),
        time: { startTime: s.startTime, endTime: s.endTime },
      });
    }
  });
  roomFilter.forEach((sched) => {
    if (sched.startTime < endTime.value && sched.endTime > startTime.value) {
      roomConflicts.push({
        room:
          classrooms &&
          classrooms.find((room) => room.id === sched.resourceId) &&
          classrooms.find((room) => room.id === sched.resourceId).title,
        availableDays: daysData.filter((day) => !sched.days.includes(day)),
        conflictingDays: daysData.filter((day) => sched.days.includes(day)),
        time: { startTime: sched.startTime, endTime: sched.endTime },
      });
    }
  });

  if (conflicts.length > 0) {
    return {
      conflictingDays: conflicts,
    };
  }
  if (roomConflicts.length > 0) {
    return {
      conflictingRooms: roomConflicts
        .sort((a, b) => a.time.startTime - b.time.startTime)
        .map((conflict, idx) => {
          return (
            <div key={idx} className="d-flex flex-column mt-2">
              <span>
                {`Conflicted Room:
                  ${conflict.room}
                `}
              </span>
              <span>
                {`Conflicted Time schedule:
                ${format(new Date(0, 0, 0, conflict.time.startTime), "h:mm aa")}
                - ${format(new Date(0, 0, 0, conflict.time.endTime), "h:mm aa")}
                `}
              </span>
              <span>
                {`Day/s occupied with the time schedule: 
               ${
                 conflict.conflictingDays.length !== 0
                   ? conflict.conflictingDays.join(", ")
                   : "None"
               }`}
              </span>
              <span>
                {`Day/s that are not occupied with time schedule: 
                ${
                  conflict.availableDays.length !== 0
                    ? conflict.availableDays.join(", ")
                    : "None"
                }`}
              </span>
            </div>
          );
        }),
    };
  }
  return {};
};
