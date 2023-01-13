import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
    color: "grey",
  },
});

const ReportData = ({ classroomSlot, classrooms, students }) => {
  const { studentsId, subject, teacher, classroomId, startTime, endTime } =
    classroomSlot;

  const classroom = classrooms.find((data) => data.id === classroomId);
  console.log(classroom);
  const studentsList = students.filter((student) => {
    return studentsId.find((studentId) => {
      return student.id === studentId.value;
    });
  });
  console.log(classroomSlot);
  return (
    <Document>
      {classroomSlot && (
        <Page style={styles.body}>
          <View
            style={{ display: "flex", flexDirection: "column", marginLeft: 30 }}
          >
            <Text style={styles.header}>Room: {classroom.roomName}</Text>
            <Text style={styles.header}>
              Time: {`${startTime} - ${endTime}`}
            </Text>
            <Text style={styles.header}>Teacher: {teacher}</Text>
            <Text style={styles.header}>Subject: {subject}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <Text style={styles.header}>Student Name</Text>
            <Text style={styles.header}>Course</Text>
            <Text style={styles.header}>Year Level</Text>
          </View>

          {studentsList.map((student) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 5,
              }}
            >
              <Text
                style={styles.header}
              >{`${student.firstName} ${student.lastName}`}</Text>
              <Text style={styles.header}>{student.course}</Text>
              <Text style={styles.header}>{student.yearLevel}</Text>
            </View>
          ))}
        </Page>
      )}
    </Document>
  );
};

export default ReportData;
