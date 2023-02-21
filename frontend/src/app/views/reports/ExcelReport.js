import React, { useContext, Fragment } from "react";
import AppContext from "app/appContext";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import ExcelData from "./ExcelData";
const ExcelReport = () => {
  const { classrooms, students, classroomSlots, teachers, subjects } =
    useContext(AppContext);

  const { id } = useParams();
  const history = useHistory();
  const classroomSlot = classroomSlots.find(
    (classroomSlot) => classroomSlot.id === id
  );
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
      <ExcelData
        classrooms={classrooms}
        students={students}
        classroomSlot={classroomSlot}
        teachers={teachers}
        subjects={subjects}
      />
    </Fragment>
  );
};

export default ExcelReport;
