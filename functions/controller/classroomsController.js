const { db } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");
// Get all classrooms
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
// Add Classroom
const setClassroom = asyncHandler(async (req, res) => {
  if (
    !req.body.title ||
    !req.body.eventColor ||
    !req.body.created ||
    !req.body.id
  ) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  const classroom = {
    id: req.body.id,
    title: req.body.title,
    eventColor: req.body.eventColor,
    created: req.body.created,
  };
  const classroomRef = db.collection("classrooms").doc(classroom.id);
  await classroomRef.create(classroom);
  res
    .status(200)
    .send({ status: "Success", message: "Classroom Saved", data: classroom });
});
// Update Classroom
const updateClassroom = asyncHandler(async (req, res) => {
  const updatedClassroom = {
    title: req.body.title,
    eventColor: req.body.eventColor,
    modified: req.body.modified,
  };
  const reqDoc = db.collection("classrooms").doc(req.params.id);
  reqDoc.update(updatedClassroom);

  res
    .status(200)
    .send({ status: "Success", message: "Updated", data: updatedClassroom });
});
// Delete classroom
const deleteClassroom = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("classrooms").doc(req.params.id);
  const batch = db.batch();
  batch.delete(reqDoc);
  const slotsDoc = db
    .collection("classroomSlots")
    .where("resourceId", "==", req.params.id)
    .get();
  (await slotsDoc).forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch
    .commit()
    .status(200)
    .send({ status: "Success", message: "Deleted" });
});
module.exports = {
  setClassroom,
  getClassrooms,
  updateClassroom,
  deleteClassroom,
};
