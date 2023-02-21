import React from "react";
import { Badge, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Col, Container } from "react-bootstrap";
import format from "date-fns/format";
const ListView = ({
  subjects,
  teachers,
  classrooms,
  classroomSlots,
  handleApprove,
  search,
  handleDeny,
}) => {
  const theadEl = [
    "ROOM",
    "DATE",
    "TIME",
    "TEACHER",
    "SUBJECT",
    "COURSE",
    "YEAR LEVEL",
    "DAYS",
    "DATE APPLIED",
    "STATUS",
  ];

  return (
    <Container>
      <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
        <div className="card border-0">
          <div className="card-body border-0">
            <table className="table ">
              <thead>
                <tr className="ul-widget6__tr--sticky-th">
                  {theadEl.map((head, idx) => (
                    <th key={idx} scope="col" className="border-0 text-primary">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {classroomSlots &&
                  classroomSlots.map((slot) => (
                    <tr key={slot.id}>
                      <td className="border-0">
                        <span>
                          {classrooms.find(
                            (classroom) => classroom.id === slot.resourceId
                          ) &&
                            classrooms.find(
                              (classroom) => classroom.id === slot.resourceId
                            ).title}
                        </span>
                      </td>
                      <td className="border-0">
                        <span>{`${format(
                          new Date(slot.startDate),
                          "yyyy/MM/dd"
                        )} - ${format(
                          new Date(slot.endDate),
                          "yyyy/MM/dd"
                        )}`}</span>
                      </td>
                      <td className="border-0">
                        <span>{`${format(
                          new Date(0, 0, 0, slot.startTime),
                          "h:mm aa"
                        )} - ${format(
                          new Date(0, 0, 0, slot.endTime),
                          "h:mm aa"
                        )}`}</span>
                      </td>
                      <td className="border-0">
                        {" "}
                        {teachers.find(
                          (teacher) => teacher.id === slot.teacher
                        ) &&
                          teachers.find(
                            (teacher) => teacher.id === slot.teacher
                          ).teacherName}
                      </td>

                      <td className="border-0">
                        <span>{slot.subject.label}</span>
                      </td>
                      <td className="border-0">{slot.course.label}</td>
                      <td className="border-0">{slot.yearLevel.label}</td>
                      <td className="border-0">
                        <div className="d-flex flex-column">
                          {slot.days.map((day) => (
                            <span>{day}</span>
                          ))}
                        </div>
                      </td>
                      <td className="border-0">
                        {" "}
                        {format(slot.created, "yyyy/MM/dd HH:mm: a")}
                      </td>
                      <td className="border-0">
                        <Badge
                          variant={slot.isApproved ? "success" : "warning"}
                        >
                          {slot.isApproved ? "Approved" : "Pending"}
                        </Badge>
                      </td>
                      {slot.isApproved === false && (
                        <td className="border-0">
                          <Dropdown>
                            <Dropdown.Toggle className=" mr-3 mb-3 toggle-hidden bg-white border-none d-flex flex-column">
                              <span className="_dot _inline-dot bg-primary mb-1"></span>
                              <span className="_dot _inline-dot bg-primary mb-1"></span>
                              <span className="_dot _inline-dot bg-primary"></span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={(e) => handleApprove(slot.id)}
                                className="dropdown-item cursor-pointer"
                              >
                                Approve
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => handleDeny(slot.id)}
                                className="dropdown-item cursor-pointer"
                              >
                                Deny
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {classroomSlots.length === 0 && (
            <div className="mx-auto border border-light rounded p-3 pb-0 mb-5">
              <p className="text-center text-muted">No slots to approve</p>
            </div>
          )}
        </div>
      </Col>
    </Container>
  );
};

export default ListView;
