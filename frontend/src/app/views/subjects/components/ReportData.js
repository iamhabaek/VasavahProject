import React, { useContext } from "react";
import AppContext from "app/appContext";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
const ReportData = ({
  classroomSlot,
  subjects,
  teachers,
  classrooms,
  subjectId,
}) => {
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
  return (
    <Document>
      {classroomSlot && subjects && teachers && classrooms && subjectId && (
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
              Subject:{" "}
              {subjects.find((subject) => subject.id === subjectId).subjectName}
            </Text>
            <Text style={styles.header}>
              Units:{" "}
              {subjects.find((subject) => subject.id === subjectId).units}
            </Text>
          </View>
          <View style={styles.thead}>
            <Text style={styles.th}>Room Name</Text>
            <Text style={styles.th}>Minutes</Text>
            <Text style={styles.th}>Teacher</Text>
            <Text style={styles.th}>Course</Text>
            <Text style={styles.th}>Year Level</Text>
            <Text style={styles.th}>Days</Text>
          </View>

          {classroomSlot &&
            classroomSlot.map((slot) => (
              <View style={styles.tbody}>
                <Text style={styles.tr}>
                  {classrooms.find(
                    (classroom) => classroom.id === slot.resourceId
                  ) &&
                    classrooms.find(
                      (classroom) => classroom.id === slot.resourceId
                    ).title}
                </Text>
                <Text style={styles.tr}>
                  {`${(slot.endTime - slot.startTime) * 60} minutes`}
                </Text>
                <Text style={styles.tr}>
                  {" "}
                  {
                    teachers.find((teacher) => teacher.id === slot.teacher)
                      .teacherName
                  }
                </Text>
                <Text style={styles.tr}>{slot.course.label}</Text>
                <Text style={styles.tr}>{slot.yearLevel.label}</Text>
                <Text style={styles.tr}>{slot.days.map((day) => day)}</Text>
              </View>
            ))}
        </Page>
      )}
    </Document>
  );
};

export default ReportData;
