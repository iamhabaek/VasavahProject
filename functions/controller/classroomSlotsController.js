const { db, admin, storage } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");
const busboy = require("busboy");
const fs = require("fs");
const path = require("path");
const os = require("os");
//@private
// Get all classroomslots
const getClassroomSlots = asyncHandler(async (req, res) => {
  // Databse reference for students collection
  let classroomSlotRef = db.collection("classroomSlots");
  let response = [];
  await classroomSlotRef.get().then((data) => {
    let docs = data.docs;
    docs.map((doc) => {
      response.push(doc.data());
    });
    return response;
  });
  res.status(200).send({ status: "Success", data: response });
});

// Create new slot
const setClassroomSlots = asyncHandler(async (req, res) => {
  const { startDate, endDate, startTime, endTime, days } = req.body;
  const schedulesRef = db
    .collection("classroomSlots")
    .where("resourceId", "==", req.body.resourceId);
  let conflict = false;
  await schedulesRef.get().then((data) => {
    const docs = data.docs;
    docs.forEach((doc) => {
      const existingSchedule = doc.data();
      // Check for overlapping schedules
      if (
        existingSchedule.startDate <= endDate &&
        existingSchedule.endDate >= startDate
      ) {
        if (
          existingSchedule.startTime < endTime &&
          existingSchedule.endTime > startTime
        ) {
          for (let i = 0; i < days.length; i++) {
            if (existingSchedule.days.includes(days[i])) {
              conflict = true;
              break;
            }
          }
        }
      }
    });
  });
  if (conflict) {
    res.status(400).send({
      message: "Conflict with existing schedule",
    });
  }
  if (!conflict) {
    const newSchedule = req.body;
    await db
      .collection("classroomSlots")
      .doc(newSchedule.id)
      .create(newSchedule);
    res.status(200).send({ message: "Success", data: newSchedule });
  }
});

// Updating classroom slot
const updateClassroomSlot = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("classroomSlots").doc(req.params.id);
  reqDoc.update({
    subject: req.body.subject,
    teacher: req.body.teacher,
    yearLevel: req.body.yearLevel,
    course: req.body.course,
  });
  res.status(200).send({ status: "Success", message: "Classroom Saved" });
});
// Updating timeslots
const updateTimeSlots = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("classroomSlots").doc(req.params.id);
  reqDoc.update({
    studentsId: req.body.studentsId,
  });
  res.status(200).send({ status: "Success", message: "Classroom Saved" });
});
const deleteClassroomSlots = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("classroomSlots").doc(req.params.id);

  await reqDoc.delete();
  res.status(200).send({ status: "Success", message: "Slot Deleted" });
});

const approveSlot = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("classroomSlots").doc(req.params.id);
  console.log(req.body);
  reqDoc.update({
    isApproved: req.body.isApproved,
  });
  res.status(200).send({ status: "Success", message: "Classroomslot Updated" });
});

const denySlot = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("classroomSlots").doc(req.params.id);
  reqDoc.delete();
  res.status(200).send({ message: "Classroomslot deleted" });
});
// Swapping classroom slots controller
const swapSlots = asyncHandler(async (req, res) => {
  // 1st document reference
  const reqDoc1 = db.collection("classroomSlots").doc(req.body.slot1Id);
  // 2nd document reference
  const reqDoc2 = db.collection("classroomSlots").doc(req.body.slot2Id);
  // Initialize batch
  const batch = db.batch();
  // batch writing methods
  batch.update(reqDoc1, {
    startTime: req.body.slot1Start,
    endTime: req.body.slot1End,
    startDate: req.body.slot1StartDate,
    endDate: req.body.slot1EndDate,
    days: req.body.slot1Days,
  });
  batch.update(reqDoc2, {
    startTime: req.body.slot2Start,
    endTime: req.body.slot2End,
    startDate: req.body.slot2StartDate,
    endDate: req.body.slot2EndDate,
    days: req.body.slot2Days,
  });
  // commit batch
  await batch.commit();
  // send response to client
  res.status(200).send({ status: "Success", message: "Slots Swapped" });
});

module.exports = {
  getClassroomSlots,
  setClassroomSlots,
  updateTimeSlots,
  swapSlots,
  deleteClassroomSlots,
  updateClassroomSlot,
  denySlot,
  approveSlot,
};
