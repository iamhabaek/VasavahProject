import React from "react";
import { format } from "date-fns";
import { Col, Container, Button, Spinner } from "react-bootstrap";
import Avatar from "react-avatar";
// Students list card view
const CardView = ({
  subjects,
  teachers,
  classrooms,
  classroomSlots,
  handleApprove,
  search,
  loading,
  handleDeny,
}) => {
  return (
    <div>
      <Container>
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <div className="row">
            {classroomSlots &&
              classroomSlots
                .filter((data) =>
                  search === ""
                    ? data
                    : data.name.toLowerCase().includes(search)
                )
                .map((slot) => (
                  <div
                    key={slot.id}
                    className="app-card text-sm col-lg-4 col-sm-4"
                  >
                    <div className=" border-none shadow card">
                      <div className="clearFix">
                        <div
                          className={`${
                            slot.isApproved === false
                              ? " text-warning"
                              : "text-success"
                          } float-left p-2`}
                        >
                          <strong>
                            {slot.isApproved === true ? "Approved" : "Pending"}
                          </strong>
                        </div>
                      </div>
                      <div className=".d-block mx-auto mw-100 text-center p-3">
                        {teachers.find(
                          (teacher) => teacher.id === slot.teacher
                        ) &&
                        teachers.find((teacher) => teacher.id === slot.teacher)
                          .photoURL ? (
                          <Avatar
                            round
                            size={80}
                            src={
                              teachers.find(
                                (teacher) => teacher.id === slot.teacher
                              ).photoURL
                            }
                          />
                        ) : (
                          <Avatar
                            size={80}
                            round
                            name={
                              teachers.find(
                                (teacher) => teacher.id === slot.teacher
                              ) &&
                              teachers.find(
                                (teacher) => teacher.id === slot.teacher
                              ).teacherName
                            }
                          />
                        )}
                      </div>
                      <div
                        style={{ backgroundColor: "#E7E5F1" }}
                        className=".d-block mw-100 "
                      >
                        <p className="font-weight-bold text-15 text-center p-2">
                          {teachers.find(
                            (teacher) => teacher.id === slot.teacher
                          ) &&
                            teachers.find(
                              (teacher) => teacher.id === slot.teacher
                            ).teacherName}
                        </p>
                      </div>
                      <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                        <span className="text-12 font-weight-bold ">
                          Date applied:
                        </span>
                        <span className="text-12">
                          {format(new Date(slot.created), "MM/dd/yyyy HH:mm a")}
                        </span>
                      </div>
                      <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                        <span className="text-12 font-weight-bold ">Room:</span>
                        <span className="text-12">
                          {classrooms.find(
                            (classroom) => classroom.id === slot.resourceId
                          ) &&
                            classrooms.find(
                              (classroom) => classroom.id === slot.resourceId
                            ).title}
                        </span>
                      </div>
                      <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                        <span className="text-12 font-weight-bold ">
                          Date schedule:
                        </span>
                        <span className="text-12">{`${format(
                          new Date(slot.startDate),
                          "yyyy/MM/dd"
                        )} - ${format(
                          new Date(slot.endDate),
                          "yyyy/MM/dd"
                        )}`}</span>
                      </div>
                      <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                        <span className="text-12 font-weight-bold ">Time:</span>
                        <span>{`${format(
                          new Date(0, 0, 0, slot.startTime),
                          "h:mm aa"
                        )} - ${format(
                          new Date(0, 0, 0, slot.endTime),
                          "h:mm aa"
                        )}`}</span>
                      </div>
                      <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                        <span className="text-12 font-weight-semibold ">
                          Subject:
                        </span>
                        <span className="text-12">{slot.subject.label}</span>
                      </div>
                      <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                        <span className="text-12 font-weight-semibold ">
                          Course:
                        </span>
                        <span className="text-12">{slot.course.label}</span>
                      </div>
                      <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                        <span className="text-12 font-weight-semibold ">
                          Year Level:
                        </span>
                        <span className="text-12">{slot.yearLevel.label}</span>
                      </div>
                      <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                        <span className="text-12 font-weight-semibold ">
                          Days:
                        </span>
                        <div className="d-flex flex-column">
                          {slot.days.map((day, idx) => (
                            <span key={idx}>{day}, </span>
                          ))}
                        </div>
                      </div>

                      {slot.isApproved === false && (
                        <div className="card-footer">
                          <div className="mc-footer">
                            <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                              <Button
                                disabled={loading}
                                variant="success"
                                type="submit"
                                className="btn-sm mr-2"
                                onClick={(e) => handleApprove(slot.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                disabled={loading}
                                variant="warning"
                                type="submit"
                                className="btn-sm"
                                onClick={(e) => handleDeny(slot.id)}
                              >
                                Deny
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
          </div>
        </Col>
      </Container>
      {classroomSlots.length === 0 && (
        <div className="mx-auto p-3 pb-0 mb-5">
          <p className="text-center text-muted">No slots to approve</p>
        </div>
      )}
    </div>
  );
};

export default CardView;
