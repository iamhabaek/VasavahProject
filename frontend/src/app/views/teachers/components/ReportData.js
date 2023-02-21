import React, { useContext } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
const ReportData = ({
  classroomSlot,
  subjects,
  classrooms,
  teachers,
  teacherId,
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
      {classroomSlot && subjects && classrooms && teachers && teacherId && (
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
              Teacher:{" "}
              {teachers.find((teacher) => teacher.id === teacherId).teacherName}
            </Text>
            <Text style={styles.header}>
              Address:{" "}
              {teachers.find((teacher) => teacher.id === teacherId).address}
            </Text>
            <Text style={styles.header}>
              Phone:{" "}
              {teachers.find((teacher) => teacher.id === teacherId).phone}
            </Text>
            <Text style={styles.header}>
              Email:{" "}
              {teachers.find((teacher) => teacher.id === teacherId).email}
            </Text>
          </View>
          <View style={styles.thead}>
            <Text style={styles.th}>Room Name</Text>
            <Text style={styles.th}>Start Time</Text>
            <Text style={styles.th}>End Time</Text>
            <Text style={styles.th}>Subject</Text>
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
                  {format(new Date(0, 0, 0, slot.startTime), "h:mm aa")}
                </Text>
                <Text style={styles.tr}>
                  {format(new Date(0, 0, 0, slot.endTime), "h:mm aa")}
                </Text>
                <Text style={styles.tr}>{slot.subject.label}</Text>
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
