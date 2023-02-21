const { db } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");
const uuid = require("uuid");
const uid = uuid.v4();

// @private
// Get Students Controller
const getStudents = asyncHandler(async (req, res) => {
  // Databse reference for students collection
  const query = db.collection("students");
  // Declare empty variable type array for storing every document
  let response = [];
  // Use get method and iterate over the list of documents
  await query.get().then((data) => {
    const docs = data.docs;
    // Pushing every document to the response variable
    docs.map((doc) => {
      response.push(doc.data());
    });
    // return array of documents
    return response;
  });
  // Sending response to client with message and data
  res.status(200).send({ status: "Success", data: response });
});

// @private
// Create Student Controller
const setStudent = asyncHandler(async (req, res) => {
  // Check to see that request body is not empty
  if (
    !req.body.name ||
    !req.body.birthDate ||
    !req.body.status ||
    !req.body.gender ||
    !req.body.address ||
    !req.body.course ||
    !req.body.phone ||
    !req.body.email ||
    !req.body.yearLevel
  ) {
    // Sending error response and statuscode to client
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  const batch = db.batch();
  // Creating a students object
  const student = {
    id: req.body.id,
    name: req.body.name,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    email: req.body.email,
    status: req.body.status,
    address: req.body.address,
    course: req.body.course,
    phone: req.body.phone,
    yearLevel: req.body.yearLevel,
    created: req.body.created,
  };
  await db.collection("students").doc(student.id).create(student);
  // Using create method and push it to referenced collection
  // Sending response to the client
  res
    .status(201)
    .send({ status: "Success", message: "Student Saved", data: student });
});

// @private
// Update Students function
const updateStudent = asyncHandler(async (req, res) => {
  // Document reference

  // Creating updated student object
  const updatedStudent = {
    id: req.params.id,
    name: req.body.name,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    email: req.body.email,
    status: req.body.status,
    address: req.body.address,
    course: req.body.course,
    phone: req.body.phone,
    yearLevel: req.body.yearLevel,
    created: req.body.created,
    modified: req.body.modified,
  };
  await db.collection("students").doc(req.params.id).update(updatedStudent);
  res.status(201).send({
    status: "Success",
    message: "Student Updated",
    data: updatedStudent,
  });
});

// @private
// Delete Students function
const deleteStudent = asyncHandler(async (req, res) => {
  // Document reference
  const reqDoc = db.collection("students").doc(req.params.id);
  reqDoc.delete(reqDoc);
  //Using delete method to delete the student from the collection
  // Sending response to client
  res.status(200).send({ status: "Success", message: "Student Removed" });
});

module.exports = {
  setStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
