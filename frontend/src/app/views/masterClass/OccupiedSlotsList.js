import React, { useContext, Fragment } from "react";
import AppContext from "app/appContext";
import { Col, Container, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Breadcrumb } from "@gull";
import { deleteSlot } from "app/reducers/actions/ClassroomActions";
import { nanoid } from "nanoid";
import { format } from "date-fns";
const OccupiedSlotsList = () => {
  const { classrooms, dispatch, teachers, classroomSlots, token } =
    useContext(AppContext);
  const filteredSlots = classroomSlots.filter(
    (slot) => slot.isApproved === true
  );
  const history = useHistory();
  const handleSwap = (id) => {
    history.push(`/masterClass/swap/${id}`);
  };
  const handleDelete = async (id) => {
    await deleteSlot(id, token)(dispatch);
  };

  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Masterclass" }]}
      />

      <Container>
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <div className="card border-0">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr className="">
                    <th className="nowrap-th border-0 text-primary" scope="col">
                      ROOM
                    </th>
                    <th className="nowrap-th border-0 text-primary" scope="col">
                      DATE
                    </th>
                    <th className="nowrap-th border-0 text-primary" scope="col">
                      TIME
                    </th>
                    <th className="nowrap-th border-0 text-primary" scope="col">
                      TEACHER
                    </th>
                    <th className="nowrap-th border-0 text-primary" scope="col">
                      SUBJECT
                    </th>
                    <th className="nowrap-th border-0 text-primary" scope="col">
                      COURSE
                    </th>
                    <th className="nowrap-th border-0 text-primary" scope="col">
                      YEAR LEVEL
                    </th>
                    <th className="nowrap-th border-0 text-primary" scope="col">
                      DAYS
                    </th>
                    <th className="border-0 text-primary">ACTIONS</th>
                  </tr>
                </thead>
                {filteredSlots.length !== 0 && (
                  <tbody>
                    {filteredSlots.sort().map((data) => (
                      <tr key={data.id}>
                        <td className="border-0">
                          {classrooms.find(
                            (classroom) => classroom.id === data.resourceId
                          ) === undefined
                            ? ""
                            : classrooms.find(
                                (classroom) => classroom.id === data.resourceId
                              ).title}
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
                        <td className="border-0">
                          <span>{`${format(
                            new Date(0, 0, 0, data.startTime),
                            "h:mm aa"
                          )} - ${format(
                            new Date(0, 0, 0, data.endTime),
                            "h:mm aa"
                          )}`}</span>
                        </td>
                        <td className="border-0">
                          {teachers.find(
                            (teacher) => teacher.id === data.teacher
                          ) === undefined
                            ? "No teacher found"
                            : teachers.find(
                                (teacher) => teacher.id === data.teacher
                              ).teacherName}
                        </td>
                        <td className="border-0">{data.subject.label}</td>
                        <td className="border-0">{data.course.label}</td>
                        <td className="border-0">{data.yearLevel.label}</td>
                        <td className="border-0">
                          <div className="d-flex flex-column">
                            {data.days.map((day) => (
                              <span>{day}, </span>
                            ))}
                          </div>
                        </td>
                        <td className="border-0">
                          <Dropdown>
                            <Dropdown.Toggle className="custom mr-3 mb-3 toggle-hidden bg-white border-none d-flex flex-column">
                              <span className="_dot _inline-dot bg-primary mb-1"></span>
                              <span className="_dot _inline-dot bg-primary mb-1"></span>
                              <span className="_dot _inline-dot bg-primary"></span>
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
                )}
              </table>
            </div>
            {filteredSlots.length === 0 && (
              <div className="mx-auto border border-light rounded p-3 pb-0 mb-5">
                <p className="text-center text-muted">No Data Found</p>
              </div>
            )}
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default OccupiedSlotsList;
