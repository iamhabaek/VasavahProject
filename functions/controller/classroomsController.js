const { db } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");

const getClassrooms = asyncHandler(async (req, res) => {
  let query = db.collection("classrooms");
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

const setClassroom = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("classrooms");
  const queryDoc = await reqDoc
    .where("roomName", "==", req.body.roomName)
    .get();
  if (!req.body.roomName || !req.body.timeSlots) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  if (queryDoc.empty) {
    await db.collection("classrooms").doc(req.body.id).create({
      id: req.body.id,
      roomName: req.body.roomName,
      timeSlots: req.body.timeSlots,
    });
    res.status(200).send({ status: "Success", message: "Classroom Saved" });
  } else {
    res.status(400);
    throw new Error("Classroom already exists");
  }
});

const applySlot = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("classrooms").doc(req.params.id);
  reqDoc.update({
    timeSlots: req.body.timeSlots,
  });
  res
    .status(200)
    .send({ status: "Success", message: "Slot Application Saved" });
});
const updateClassroom = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("classrooms").doc(req.params.id);

  const batch = db.batch();
  batch.update(reqDoc, {
    roomName: req.body.roomName,
    timeSlots: req.body.timeSlots,
  });
  const slotsDoc = db
    .collection("classroomSlots")
    .where("classroomId", "==", req.params.id)
    .get();
  (await slotsDoc).forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch
    .commit()
    .status(200)
    .send({ status: "Success", message: "Updated" });
});
const deleteClassroom = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("classrooms").doc(req.params.id);
  const batch = db.batch();
  batch.delete(reqDoc);
  const slotsDoc = db
    .collection("classroomSlots")
    .where("classroomId", "==", req.params.id)
    .get();
  (await slotsDoc).forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch
    .commit()
    .status(200)
    .send({ status: "Success", message: "Updated" });
});
module.exports = {
  setClassroom,
  getClassrooms,
  applySlot,
  updateClassroom,
  deleteClassroom,
};
