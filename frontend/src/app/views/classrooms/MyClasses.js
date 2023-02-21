import React, { useContext, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container, Dropdown } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { Breadcrumb } from "@gull";
import { format } from "date-fns";
import { getClassroomSlotList } from "app/reducers/actions/ClassroomActions";
const MyClasses = () => {
  const {
    classrooms,
    requests,
    classroomSlots,
    token,
    dispatch,
    teachers,
    subjects,
    user,
  } = useContext(AppContext);
  const history = useHistory();
  const filterSlots = classroomSlots.filter(
    (slot) => slot.teacher === user.uid && slot.isApproved === true
  );
  const handleCloseSchedule = (id) => {
    history.push(`/requests/close-schedule/${id}`);
    getClassroomSlotList(token)(dispatch);
  };
  const handleSwapSchedule = (id) => {
    history.push(`/requests/swap-schedule/${id}`);
    getClassroomSlotList(token)(dispatch);
  };
  const handleView = (id) => {
    history.push(`/classrooms/assignStudents/list/${id}`);
  };
  const handleAssignNew = (id) => {
    history.push(`/classrooms/assignStudents/${id}`);
  };
  const handleFilterChange = () => {};
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "My Classes" }]}
      />
      {classroomSlots && classrooms && subjects && teachers && filterSlots ? (
        <Container>
          <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
            <div className="card">
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr className="">
                      <th className="border-0">ROOM</th>
                      <th className="border-0" scope="col">
                        TIME
                      </th>
                      <th className="border-0" scope="col">
                        DATE
                      </th>
                      <th className="border-0" scope="col">
                        SUBJECT
                      </th>
                      <th className="border-0" scope="col">
                        COURSE
                      </th>
                      <th className="border-0" scope="col">
                        YEAR LEVEL
                      </th>
                      <th className="border-0" scope="col">
                        DAYS
                      </th>
                      <th className="border-0" scope="col">
                        STUDENTS
                      </th>
                      <th className="border-0">ASSIGN STUDENT</th>
                    </tr>
                  </thead>
                  {filterSlots.length !== 0 && (
                    <tbody>
                      {filterSlots.map((data) => (
                        <tr key={data.id}>
                          <td className="border-0">
                            {classrooms.find(
                              (classroom) => classroom.id === data.resourceId
                            ) === undefined
                              ? ""
                              : classrooms.find(
                                  (classroom) =>
                                    classroom.id === data.resourceId
                                ).title}
                          </td>
                          <td className="border-0">
                            <span>{`${format(
                              new Date(0, 0, 0, data.startTime),
                              "h:mm aa"
                            )}-${format(
                              new Date(0, 0, 0, data.endTime),
                              "h:mm aa"
                            )}`}</span>
                          </td>
                          <td className="border-0">
                            <span>{`${format(
                              new Date(data.startDate),
                              "yyyy/MM/dd"
                            )} - ${format(
                              new Date(data.endDate),
                              "yyyy/MM/dd"
                            )}`}</span>
                          </td>
                          <td className="border-0">{data.subject.label}</td>
                          <td className="border-0">{data.course.label}</td>
                          <td className="border-0">{data.yearLevel.label}</td>
                          <td className="border-0">
                            <div className="d-flex flex-column">
                              {data.days.map((day, idx) => (
                                <span key={idx}>{day},</span>
                              ))}
                            </div>
                          </td>
                          <td className="border-0">
                            <Button
                              onClick={() => handleView(data.id)}
                              variant="secondary"
                              className="btn-sm"
                            >
                              View
                            </Button>
                          </td>
                          <td className="border-0">
                            <Button
                              variant="primary"
                              className="btn-sm mr-2"
                              onClick={() => handleAssignNew(data.id)}
                            >
                              {" "}
                              Assign{" "}
                            </Button>
                          </td>
                          <td className="border-0">
                            <Dropdown>
                              <Dropdown.Toggle className=" mr-3 mb-3 toggle-hidden bg-white border-none d-flex flex-column">
                                <span className="_dot _inline-dot bg-primary mb-1"></span>
                                <span className="_dot _inline-dot bg-primary mb-1"></span>
                                <span className="_dot _inline-dot bg-primary"></span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Link
                                  to={`/reports/genereate-report/${data.id}`}
                                  className="dropdown-item cursor-pointer"
                                >
                                  PDF
                                </Link>

                                <Link
                                  to={`/reports/genereate-excel/${data.id}`}
                                  className="dropdown-item cursor-pointer"
                                >
                                  Excel
                                </Link>
                                {!requests.some(
                                  (req) =>
                                    req.scheduleId === data.id &&
                                    req.status === "Pending" &&
                                    req.type === "Close"
                                ) && (
                                  <Link
                                    onClick={() => handleCloseSchedule(data.id)}
                                    className="dropdown-item cursor-pointer"
                                  >
                                    Request close schedule
                                  </Link>
                                )}
                                {!requests.some(
                                  (req) =>
                                    req.scheduleId === data.id &&
                                    req.status === "Pending" &&
                                    req.type === "Swap"
                                ) && (
                                  <Link
                                    onClick={() => handleSwapSchedule(data.id)}
                                    className="dropdown-item cursor-pointer"
                                  >
                                    Request swap schedule
                                  </Link>
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
              {filterSlots.length === 0 && (
                <div className="mx-auto border border-light rounded p-3 pb-0 mb-5">
                  <p className="text-center text-muted">No Data Found</p>
                </div>
              )}
            </div>
          </Col>
        </Container>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default MyClasses;
