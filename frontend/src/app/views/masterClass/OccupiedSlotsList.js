import React, { useContext, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Button, Container, Dropdown } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { Breadcrumb } from "@gull";
import Swal from "sweetalert2";
import api from "app/api/api";
import { deleteSlot } from "app/reducers/actions/ClassroomActions";
const OccupiedSlotsList = () => {
  const { classrooms, dispatch, classroomSlots } = useContext(AppContext);
  const history = useHistory();
  const handleSwap = (id) => {
    history.push(`/masterClass/swap/${id}`);
  };
  const handleDelete = (id) => {
    deleteSlot(id)(dispatch);
  };

  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Masterclass" }]}
      />
      {classroomSlots ? (
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
                              DAYS
                            </th>
                            <th className="border-0">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {classroomSlots.sort().map((data) => (
                            <tr key={data.id}>
                              <td className="border-0">
                                {classrooms &&
                                  classrooms.find(
                                    (classroom) =>
                                      classroom.id === data.classroomId
                                  ).roomName}
                              </td>

                              <td className="border-0">
                                <span>{`${data.startTime} - ${data.endTime}`}</span>
                              </td>
                              <td className="border-0">{data.teacher}</td>
                              <td className="border-0">{data.subject}</td>
                              <td className="border-0">{data.course}</td>
                              <td className="border-0">
                                {data.days.map((day) => (
                                  <span>{day.label}, </span>
                                ))}
                              </td>
                              <td className="border-0">
                                <Dropdown>
                                  <Dropdown.Toggle className="custom mr-3 mb-3 toggle-hidden border-0 d-flex flex-column">
                                    <span className="_dot _inline-dot bg-white mb-1"></span>
                                    <span className="_dot _inline-dot bg-white mb-1"></span>
                                    <span className="_dot _inline-dot bg-white"></span>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={() => handleSwap(data.id)}
                                      className="dropdown-item cursor-pointer"
                                    >
                                      Swap Slot
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => handleDelete(data.id)}
                                      className="dropdown-item cursor-pointer"
                                    >
                                      Delete
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
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
        <h1>No Data Found</h1>
      )}
    </Fragment>
  );
};

export default OccupiedSlotsList;
