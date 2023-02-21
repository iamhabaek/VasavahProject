const { db, admin } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");

// Get all teachers
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

// Creating new taecher
const setTeacher = asyncHandler(async (req, res) => {
  if (
    !req.body.teacherName ||
    !req.body.gender ||
    !req.body.address ||
    !req.body.phone ||
    !req.body.subjects
  ) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  const {
    email,
    teacherName,
    subjects,
    birthDate,
    gender,
    address,
    phone,
    created,
  } = req.body;

  const user = await admin.auth().createUser({
    email,
    password: "informatics",
    displayName: teacherName,
  });
  const teacher = {
    id: user.uid,
    teacherName: teacherName,
    subjects: subjects,
    birthDate: birthDate,
    gender: gender,
    address: address,
    phone: phone,
    email: email,
    created: created,
  };
  await admin.auth().setCustomUserClaims(user.uid, { role: "_teacher" });
  const reqDoc = db.collection("teachers").doc(user.uid);
  await reqDoc.create(teacher);
  res.status(200).send({ status: "Success", data: teacher });
});

// Updating teacher
const updateTeacher = asyncHandler(async (req, res) => {
  const teacher = {
    id: req.params.id,
    teacherName: req.body.teacherName,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    address: req.body.address,
    phone: req.body.phone,
    subjects: req.body.subjects,
    email: req.body.email,
    modified: req.body.modified,
    created: req.body.created,
  };
  const reqDoc = db.collection("teachers").doc(req.params.id);
  await reqDoc.update(teacher);
  res.status(200).send({ status: "Success", message: "Teacher Updated" });
});
// Deleting teacher
const deleteTeacher = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("teachers").doc(req.params.id);
  await admin.auth().deleteUser(req.params.id);
  await reqDoc.delete();
  res.status(200).send({ status: "Success", message: "Teacher Removed" });
});
module.exports = {
  setTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
};
