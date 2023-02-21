import React, { useContext, Fragment } from "react";
import AppContext from "app/appContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportData from "./ReportData";
import { useHistory } from "react-router-dom";
const PdfReport = ({ teacherId }) => {
  const { classroomSlots, subjects, teachers, classrooms } =
    useContext(AppContext);
  const history = useHistory();
  const classroomSlot = classroomSlots.filter(
    (slot) => slot.teacher === teacherId
  );
  const handleClick = () => {
    setTimeout(() => {
      history.push("/teachers/teachersList");
    }, 5000);
  };
  console.log(classroomSlot);
  return (
    <Fragment>
      <div className="mt-5">
        {classroomSlot && (
          <ReportData
            classroomSlot={classroomSlot}
            subjects={subjects}
            classrooms={classrooms}
            teachers={teachers}
            teacherId={teacherId}
          />
        )}
      </div>
      <PDFDownloadLink
        document={
          classroomSlot && (
            <ReportData
              classroomSlot={classroomSlot}
              subjects={subjects}
              classrooms={classrooms}
              teachers={teachers}
              teacherId={teacherId}
            />
          )
        }
        fileName="Test"
        className="mb-10"
      >
        {({ loading }) =>
          loading ? (
            <button className="btn btn-primary mt-5">
              Loading document...
            </button>
          ) : (
            <button className="btn btn-primary mt-5" onClick={handleClick}>
              Download PDF!
            </button>
          )
        }
      </PDFDownloadLink>
    </Fragment>
  );
};

export default PdfReport;
