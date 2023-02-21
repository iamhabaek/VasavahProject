import React, { useContext, useState } from "react";
import TopCard from "./TopCard";
import AppContext from "app/appContext";
import { Breadcrumb } from "@gull";
import NewStudents from "./NewStudents";
import NewTeachers from "./NewTeachers";
import StudentsChart from "./StudentsChart";
import SimpleCard from "@gull/components/cards/SimpleCard";
import Select from "react-select";
const Dashboard = () => {
  const { classrooms, students, teachers, subjects, courses, classroomSlots } =
    useContext(AppContext);

  return (
    <div>
      <Breadcrumb routeSegments={[{ name: "Dashboard", path: "/dashboard" }]} />
      {classrooms &&
        students &&
        teachers &&
        subjects &&
        courses &&
        classroomSlots && (
          <div>
            <TopCard
              classrooms={classrooms}
              students={students}
              teachers={teachers}
              subjects={subjects}
              courses={courses}
              classroomSlots={classroomSlots}
            />
            <div className="row mt-5">
              <div className="col-lg-6">
                <NewStudents students={students} />
              </div>
              <div className="col-lg-6">
                <NewTeachers teachers={teachers} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <StudentsChart
                  classrooms={classrooms}
                  subjects={subjects}
                  courses={courses}
                  teachers={teachers}
                  classroomSlots={classroomSlots}
                  students={students}
                ></StudentsChart>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Dashboard;
