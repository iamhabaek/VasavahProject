const { db, admin, storage } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");
const busboy = require("busboy");
const fs = require("fs");
const path = require("path");
const os = require("os");

const updateUser = asyncHandler(async (req, res) => {
  const bb = busboy({ headers: req.headers });

  let imageFileName = {};
  let imagetoUpload;
  let imageUrl = [];
  bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (
      filename.mimeType === "image/jpeg" ||
      filename.mimeType === "image/png"
    ) {
      console.log(filename);
      console.log(req.headers);

      // Getting extension of any image
      const imageExtension = filename.filename.split(".")[1];
      // // Setting filename
      imageFileName = `${Math.round(
        Math.random() * 1000000000
      )}.${imageExtension}`;

      // Creating path
      const filepath = path.join(os.tmpdir(), imageFileName);
      imagetoUpload = {
        imageFileName,
        filepath,
        mimetype,
      };

      file.pipe(fs.createWriteStream(filepath));
      //Add the image to the array
    } else {
      console.log("wrong type submitted");
    }
  });
  bb.on("finish", async () => {
    try {
      imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
        storage.bucket().name
      }/o/${imagetoUpload.imageFileName}?alt=media`;
      storage.bucket().upload(imagetoUpload.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imagetoUpload.mimetype,
          },
        },
      });
      const updated = { photoURL: imageUrl };
      await admin.auth().updateUser(req.params.id, updated);
      await db.collection("teachers").doc(req.params.id).update(updated);
      res.status(200).send({
        message: "Success",
        data: imageUrl,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      throw new Error(err);
    }
  });
  bb.end(req.rawBody);
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await admin.auth().listUsers(1000);
    res.status(200).send({ message: "success", data: users.users });
  } catch (error) {
    res.status(400).send({ message: { error } });
  }
});
const updateRole = asyncHandler(async (req, res) => {
  const { id, newRole } = req.body;

  admin
    .auth()
    .getUser(id)
    .then(function (userRecord) {
      // Retrieve the current custom claims object
      var currentClaims = userRecord.customClaims || {};

      // Modify the custom claims to reflect the new role
      currentClaims.role = newRole;

      // Set the updated custom claims for the user
      return admin.auth().setCustomUserClaims(userRecord.uid, currentClaims);
    })
    .then(function () {
      res.status(200).send({ success: true });
    })
    .catch(function (error) {
      console.error("Error updating custom claims:", error);
      res.status(500).json({ success: false, error: error });
    });
});
module.exports = {
  updateUser,
  getUsers,
  updateRole,
};
