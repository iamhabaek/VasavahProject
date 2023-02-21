const admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://informatics-3c338.appspot.com",
});

const db = admin.firestore();
const storage = admin.storage();
module.exports = {
  db,
  admin,
  storage,
};
