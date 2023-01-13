const { db } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");

const getTeachers = asyncHandler(async (req, res) => {
  let query = db.collection("teachers");
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

const setTeacher = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("teachers");
  const queryDoc = await reqDoc
    .where("teacherName", "==", req.body.teacherName)
    .get();
  if (
    !req.body.teacherName ||
    !req.body.age ||
    !req.body.gender ||
    !req.body.address ||
    !req.body.phone ||
    !req.body.subjects
  ) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  if (queryDoc.empty) {
    await db.collection("teachers").doc(req.body.id).create({
      id: req.body.id,
      teacherName: req.body.teacherName,
      subjects: req.body.subjects,
      age: req.body.age,
      gender: req.body.gender,
      address: req.body.address,
      phone: req.body.phone,
    });
    res.status(200).send({ status: "Success", message: "Teacher Saved" });
  } else {
    res.status(400);
    throw new Error("Teacher already exists");
  }
});

const updateTeacher = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("teachers").doc(req.params.id);
  await reqDoc.update({
    id: req.body.id,
    teacherName: req.body.teacherName,
    age: req.body.age,
    gender: req.body.gender,
    address: req.body.address,
    phone: req.body.phone,
    subjects: req.body.subjects,
  });
  res.status(200).send({ status: "Success", message: "Teacher Updated" });
});
const deleteTeacher = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("teachers").doc(req.params.id);
  await reqDoc.delete();
  res.status(200).send({ status: "Success", message: "Teacher Removed" });
});
module.exports = {
  setTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
};
