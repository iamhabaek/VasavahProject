import React, { useContext, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Breadcrumb } from "@gull";

const AssignStudents = () => {
  const { classrooms, classroomSlots, teachers, subjects } =
    useContext(AppContext);
  const history = useHistory();
  const handleView = (id) => {
    history.push(`/classrooms/assignStudents/list/${id}`);
  };
  const handleAssignNew = (id) => {
    history.push(`/classrooms/assignStudents/${id}`);
  };
  const handleGenerate = (id) => {
    history.push(`/reports/genereate-report/${id}`);
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Assign and Generate" },
        ]}
      />
      {classroomSlots && classrooms && subjects && teachers ? (
        <Container>
          <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
            <div className="card border-0">
              <div className="card-body">
                <div className="ul-widget__head border-0 mb-5">
                  <div className="ul-widget__head-label">
                    <h3 className="ul-widget__head-title"></h3>
                  </div>
                </div>
                <div className="ul-widget-body">
                  <div className="ul-widget3">
                    <div className="ul-widget6__item--table">
                      <table className="table">
                        <thead>
                          <tr className="">
                            <th className="nowrap-th border-0" scope="col">
                              ROOM
                            </th>
                            <th className="nowrap-th border-0" scope="col">
                              TIME
                            </th>
                            <th className="nowrap-th border-0" scope="col">
                              TEACHER
                            </th>
                            <th className="nowrap-th border-0" scope="col">
                              SUBJECT
                            </th>
                            <th className="nowrap-th border-0" scope="col">
                              COURSE
                            </th>
                            <th className="nowrap-th border-0" scope="col">
                              STUDENTS
                            </th>
                            <th className="border-0">ASSIGN STUDENT</th>
                            <th className="border-0">ROOM REPORT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {classroomSlots.map((data) => (
                            <tr key={data.id}>
                              <td className="border-0">
                                {classrooms
                                  ? classrooms.find(
                                      (classroom) =>
                                        classroom.id === data.classroomId
                                    ).roomName
                                  : ""}
                              </td>
                              <td className="border-0">
                                <span>{`${data.startTime} - ${data.endTime}`}</span>
                              </td>
                              <td className="border-0">{data.teacher}</td>
                              <td className="border-0">{data.subject}</td>
                              <td className="border-0">{data.course}</td>
                              <td className="border-0">
                                <Button
                                  onClick={() => handleView(data.id)}
                                  variant="secondary"
                                >
                                  View
                                </Button>
                              </td>
                              <td className="border-0">
                                <Button
                                  variant="primary"
                                  className="mr-2"
                                  onClick={() => handleAssignNew(data.id)}
                                >
                                  {" "}
                                  Assign{" "}
                                </Button>
                              </td>
                              <td className="border-0">
                                {" "}
                                <Button
                                  variant="success"
                                  onClick={() => handleGenerate(data.id)}
                                >
                                  Generate
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Container>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default AssignStudents;
