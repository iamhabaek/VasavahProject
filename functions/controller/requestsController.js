const { db, admin, storage } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");
const busboy = require("busboy");
const fs = require("fs");
const path = require("path");
const os = require("os");
const getRequests = asyncHandler(async (req, res) => {
  let query = db.collection("requests");
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

const updateRequest = asyncHandler(async (req, res) => {
  const request = req.body;
  const id = req.params.id;
  const reqDoc = db.collection("requests").doc(id);
  await reqDoc.update(request);
  res.status(200).send({ status: "Success", data: request });
});

const deleteRequest = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const reqDoc = db.collection("requests").doc(id);
  await reqDoc.delete();
  res.status(200).send({ status: "Success" });
});

const setRequest = asyncHandler(async (req, res) => {
  let bb = busboy({ headers: req.headers });

  let fields = {};
  let imagesToUpload = [];
  let imageUrls = [];

  bb.on("field", (fieldname, fieldvalue) => {
    fields[fieldname] = fieldvalue;
  });

  bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const fileExtension = filename.filename.split(".")[1];
    const imageFileName = `${Math.round(
      Math.random() * 1000000000
    )}.${fileExtension}`;

    // Creating path
    const filepath = path.join(os.tmpdir(), imageFileName);
    const fileToAdd = {
      imageFileName,
      filepath,
      mimetype,
    };

    file.pipe(fs.createWriteStream(filepath));
    //Add the file to the array
    imagesToUpload.push(fileToAdd);
  });

  bb.on("finish", async () => {
    let promises = [];

    imagesToUpload.forEach((fileToBeUploaded) => {
      const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${
        storage.bucket().name
      }/o/${fileToBeUploaded.imageFileName}?alt=media`;

      imageUrls.push(fileUrl);
      fields.attachments = imageUrls;

      promises.push(
        storage.bucket().upload(fileToBeUploaded.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: fileToBeUploaded.mimetype,
            },
          },
        })
      );
    });
    try {
      await db.collection("requests").doc(fields.id).set(fields);
      await Promise.all(promises);
      res.status(200).send({
        message: "Success",
        data: fields,
      });
    } catch (err) {
      throw new Error(err);
    }
  });

  bb.end(req.rawBody);
});

module.exports = {
  getRequests,
  setRequest,
  updateRequest,
  deleteRequest,
};
