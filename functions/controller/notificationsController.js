const { db } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");

const getNotifications = asyncHandler(async (req, res) => {
  let query = db.collection("notifications");
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

const setNotification = asyncHandler(async (req, res) => {
  await db.collection("notifications").doc(req.body.id).create({
    id: req.body.id,
    isViewed: req.body.isViewed,
    action: req.body.action,
    user: req.body.user,
    content: req.body.content,
    created: req.body.created,
  });

  res.status(200).send({ status: "Success", message: "Notification Saved" });
});
const updateNotification = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("notifications").doc(req.params.id);

  await reqDoc.update({
    isViewed: req.body.isViewed,
  });

  res.status(200).send({ status: "Success", message: "Notification Updated" });
});
const deleteNotification = asyncHandler(async (req, res) => {
  const reqDoc = db.collection("notifications").doc(req.params.id);

  await reqDoc.delete();

  res.status(200).send({ status: "Success", message: "Notification Deleted" });
});

module.exports = {
  getNotifications,
  setNotification,
  updateNotification,
  deleteNotification,
};
