const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
const { errorHandler } = require("./middleware/errorHandler");

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/students", require("./routes/studentsRoutes"));
app.use("/teachers", require("./routes/teachersRoutes"));
app.use("/subjects", require("./routes/subjectsRoutes"));
app.use("/courses", require("./routes/coursesRoutes"));
app.use("/classrooms", require("./routes/classroomsRoutes"));
app.use("/classroomSlots", require("./routes/classroomSlotsRoutes"));
app.use("/notifications", require("./routes/notificationsRoutes"));
app.use("/requests", require("./routes/requestsRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.use(errorHandler);

exports.app = functions.https.onRequest(app);
