const { db } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");

const getClassroomSlots = asyncHandler(async (req, res) => {
  let query = db.collection("classroomSlots");
  let response = [];
  await query.get().then((data) => {
    let docs = data.docs;
    docs.map((doc) => {
      response.push(doc.data());
    });
    return response;
  });
  res.status(200).send({ status: "Success", data: response });
});

const setClassroomSlots = asyncHandler(async (req, res) => {
  await db.collection("classroomSlots").doc(req.body.id).create({
    id: req.body.id,
    classroomId: req.body.classroomId,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    subject: req.body.subject,
    teacher: req.body.teacher,
    yearLevel: req.body.yearLevel,
    course: req.body.course,
    days: req.body.days,
    studentsId: [],
  });
  res.status(200).send({ status: "Success", message: "Classroom Saved" });
});
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
const swapSlots = asyncHandler(async (req, res) => {
  const reqDoc1 = db.collection("classroomSlots").doc(req.body.slot1Id);
  const reqDoc2 = db.collection("classroomSlots").doc(req.body.slot2Id);
  console.log(req.body);
  reqDoc1.update({
    startTime: req.body.slot1Start,
    endTime: req.body.slot1End,
  });

  reqDoc2.update({
    startTime: req.body.slot2Start,
    endTime: req.body.slot2End,
  });
  res.status(200).send({ status: "Success", message: "Classroom Saved" });
});

module.exports = {
  getClassroomSlots,
  setClassroomSlots,
  updateTimeSlots,
  swapSlots,
  deleteClassroomSlots,
  updateClassroomSlot,
};
