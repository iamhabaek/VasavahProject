const { db } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");

const getSubjects = asyncHandler(async (req, res) => {
  let query = db.collection("subjects");
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

const setSubject = asyncHandler(async (req, res) => {
  if (!req.body.subjectName || !req.body.units) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  await db.collection("subjects").doc(req.body.id).create({
    id: req.body.id,
    subjectName: req.body.subjectName,
    units: req.body.units,
  });
  res.status(200).send({ status: "Success", message: "Course Saved" });
});

const updateSubject = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("subjects").doc(req.params.id);
  await reqDoc.update({
    subjectName: req.body.subjectName,
    units: req.body.units,
  });
  res.status(200).send({ status: "Success", message: "Subject Updated" });
});
const deleteSubject = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("subjects").doc(req.params.id);
  await reqDoc.delete();
  res.status(200).send({ status: "Success", message: "Subject Removed" });
});
module.exports = {
  setSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
};
