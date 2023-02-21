import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#d11fb6",
    color: "white",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 0,
    textAlign: "left",
    color: "black",
    fontWeight: "bold",
  },
  thead: {
    display: "flex",
    flexDirection: "row",
    border: "1pt solid black",
    marginHorizontal: 25,
    padding: 10,
    marginTop: 20,
  },
  tbody: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1pt solid black",
    borderLeft: "1pt solid black",
    borderRight: "1pt solid black",
    marginHorizontal: 25,
    padding: 10,
  },

  th: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    width: "22%",
    margin: 0,
  },
  tr: {
    fontSize: 8,
    fontWeight: "bold",
    marginHorizontal: "auto",
    textAlign: "center",
    width: "20%",
    color: "black",
    margin: 0,
  },
});
const ReportData = ({
  classroomSlot,
  classrooms,
  students,
  teachers,
  subjects,
}) => {
  const { studentsId, subject, teacher, resourceId, startTime, endTime } =
    classroomSlot;

  const classroom = classrooms.find((data) => data.id === resourceId);
  const teacherObj = teachers.find((data) => data.id === teacher);
  const studentsList = students.filter((student) => {
    return studentsId.find((studentId) => {
      return student.id === studentId;
    });
  });
  return (
    <Document>
      {classroomSlot && classroom && teacherObj && studentsId && (
        <Page>
          <View
            style={{
              display: "flex",
              backgroundColor: "#663399",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15,
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
              SMUDGETEST
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginHorizontal: 25,
              marginTop: 20,
            }}
          >
            <Text style={styles.header}>
              Room: {classroom && classroom.roomName}
            </Text>
            <Text style={styles.header}>
              Time:{" "}
              {`${format(new Date(0, 0, 0, startTime), "h:mm aa")} - ${format(
                new Date(0, 0, 0, endTime),
                "h:mm aa"
              )}`}
            </Text>
            <Text style={styles.header}>Teacher: {teacherObj.teacherName}</Text>
            <Text style={styles.header}>Subject: {subject.label}</Text>
          </View>
          <View style={styles.thead}>
            <Text style={styles.th}>Student Name</Text>
            <Text style={styles.th}>Address</Text>
            <Text style={styles.th}>Phone</Text>
            <Text style={styles.th}>Gender</Text>
            <Text style={styles.th}>Course</Text>
            <Text style={styles.th}>Year Level</Text>
            <Text style={styles.th}>Status</Text>
          </View>

          {studentsList &&
            studentsList.map((student) => (
              <View style={styles.tbody}>
                <Text style={styles.tr}>{student.name}</Text>
                <Text style={styles.tr}>{student.address}</Text>
                <Text style={styles.tr}>{student.phone}</Text>
                <Text style={styles.tr}>{student.gender}</Text>
                <Text style={styles.tr}>{student.course}</Text>
                <Text style={styles.tr}>{student.yearLevel}</Text>
                <Text style={styles.tr}>{student.status}</Text>
              </View>
            ))}
        </Page>
      )}
    </Document>
  );
};

export default ReportData;
