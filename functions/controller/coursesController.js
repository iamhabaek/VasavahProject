const { db } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");

// Get all courses
const getCourses = asyncHandler(async (req, res) => {
  let query = db.collection("courses");
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

// Creating new course
const setCourse = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("courses");
  const queryDoc = await reqDoc
    .where("courseName", "==", req.body.courseName)
    .get();
  if (!req.body.courseName || !req.body.yearsToFinish) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  if (queryDoc.empty) {
    await db.collection("courses").doc(req.body.id).create({
      id: req.body.id,
      courseName: req.body.courseName,
      yearsToFinish: req.body.yearsToFinish,
      created: req.body.created,
    });
    res.status(200).send({ status: "Success", message: "Course Saved" });
  } else {
    res.status(400);
    throw new Error("Course already exists");
  }
});
// Updating course
const updateCourse = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("courses").doc(req.params.id);
  await reqDoc.update({
    courseName: req.body.courseName,
    yearsToFinish: req.body.yearsToFinish,
  });
  res.status(200).send({ status: "Success", message: "Course Updated" });
});

// Deleting course
const deleteCourse = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("courses").doc(req.params.id);
  await reqDoc.delete();
  res.status(200).send({ status: "Success", message: "Course Removed" });
});
module.exports = {
  setCourse,
  getCourses,
  updateCourse,
  deleteCourse,
};
