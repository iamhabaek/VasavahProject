const { db } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");

const getStudents = asyncHandler(async (req, res) => {
  let query = db.collection("students");
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

const setStudent = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("students");
  const queryDoc = await reqDoc.where("name", "==", req.body.name).get();
  if (
    !req.body.name ||
    !req.body.age ||
    !req.body.gender ||
    !req.body.address ||
    !req.body.course ||
    !req.body.phone ||
    !req.body.yearLevel
  ) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  if (queryDoc.empty) {
    await db.collection("students").doc(req.body.id).create({
      id: req.body.id,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      address: req.body.address,
      course: req.body.course,
      phone: req.body.phone,
      yearLevel: req.body.yearLevel,
    });
    res.status(200).send({ status: "Success", message: "Student Saved" });
  } else {
    res.status(400);
    throw new Error("Student already exists");
    // next();
  }
});

const updateStudent = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("students").doc(req.params.id);
  await reqDoc.update({
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    address: req.body.address,
    course: req.body.course,
    phone: req.body.phone,
    yearLevel: req.body.yearLevel,
  });
  res.status(200).send({ status: "Success", message: "Student Updated" });
});
const deleteStudent = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("students").doc(req.params.id);
  await reqDoc.delete();
  res.status(200).send({ status: "Success", message: "Student Removed" });
});
module.exports = {
  setStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
