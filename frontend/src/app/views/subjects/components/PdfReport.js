import React, { useContext, Fragment } from "react";
import AppContext from "app/appContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportData from "./ReportData";
import { useHistory } from "react-router-dom";
const PdfReport = ({ subjectId }) => {
  const { classroomSlots, subjects, teachers, classrooms } =
    useContext(AppContext);
  const history = useHistory();
  const classroomSlot = classroomSlots.filter(
    (slot) => slot.subject.value === subjectId
  );
  const handleClick = () => {
    setTimeout(() => {
      history.push("/subjects/subjects-list");
    }, 5000);
  };
  console.log(classroomSlot);
  return (
    <Fragment>
      <div className="mt-5">
        {classroomSlot && (
          <ReportData
            classroomSlot={classroomSlot}
            classrooms={classrooms}
            subjects={subjects}
            teachers={teachers}
            subjectId={subjectId}
          />
        )}
      </div>

      <PDFDownloadLink
        document={
          classroomSlot && (
            <ReportData
              subjects={subjects}
              teachers={teachers}
              classrooms={classrooms}
              classroomSlot={classroomSlot}
              subjectId={subjectId}
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
              Download
            </button>
          )
        }
      </PDFDownloadLink>
    </Fragment>
  );
};

export default PdfReport;
