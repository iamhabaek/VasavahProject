import React, { useContext, Fragment } from "react";
import AppContext from "app/appContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportData from "./ReportData";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";

const GenerateReport = () => {
  const { classrooms, students, classroomSlots, teachers, subjects } =
    useContext(AppContext);

  const { id } = useParams();
  const history = useHistory();
  const handleClick = () => {
    setTimeout(() => {
      history.push("/classrooms/my-classes/");
    }, 5000);
  };
  const classroomSlot = classroomSlots.find(
    (classroomSlot) => classroomSlot.id === id
  );
  console.log(classroomSlot);
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          {
            name: "My Classes",
            path: "/classrooms/my-classes/",
          },
          { name: "Generate" },
        ]}
      />
      <PDFDownloadLink
        document={
          classroomSlot && (
            <ReportData
              classrooms={classrooms}
              students={students}
              classroomSlot={classroomSlot}
              teachers={teachers}
              subjects={subjects}
            />
          )
        }
        fileName="Test"
        className="mb-10"
      >
        {({ loading }) =>
          loading ? (
            <button className="btn btn-primary mb-5">
              Loading document...
            </button>
          ) : (
            <button className="btn btn-primary mb-5" onClick={handleClick}>
              Download PDF!
            </button>
          )
        }
      </PDFDownloadLink>
      {classroomSlot && (
        <ReportData
          classrooms={classrooms}
          students={students}
          classroomSlot={classroomSlot}
          teachers={teachers}
          subjects={subjects}
        />
      )}
    </Fragment>
  );
};

export default GenerateReport;
