import React, { useState } from "react";
import { Col, Container, Button } from "react-bootstrap";
import { format } from "date-fns";
import Reason from "../../SharedComponents/Reason";
import ScheduleToSwapModal from "../../SharedComponents/ScheduleToSwapModal";
import ImageModal from "../../SharedComponents/ImageModal";
import SwapReject from "./SwapReject";
const SwapListView = ({
  list,
  classrooms,
  classroomSlots,
  teachers,
  search,
  handleApprove,
  handleReject,
  token,
  dispatch,
}) => {
  const [show, setShow] = useState(false);
  const theadEl = [
    "REQUEST",
    "ROOM",
    "DATE",
    "TIME",
    "TEACHER",
    "DATE REQUESTED",
    "STATUS",
    "SCHEDULE TO SWAP",
    "REASON",
    "ATTACHMENTS",
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
                  <th className="border-0 text-primary"></th>
                  <th className="border-0 text-primary"></th>
                </tr>
              </thead>
              {list.length !== 0 && (
                <tbody>
                  {list
                    .filter((data) =>
                      search === ""
                        ? data
                        : data.name.toLowerCase().includes(search)
                    )
                    .map((request) => (
                      <tr
                        className="border-bottom border-dotted"
                        key={request.id}
                      >
                        <td className="border-0">
                          <span>{request.type} Schedule</span>
                        </td>
                        <td className="border-0">
                          {classrooms.find(
                            (room) =>
                              room.id ===
                              classroomSlots.find(
                                (slot) => slot.id === request.scheduleId
                              )
                          ) &&
                            classrooms.find(
                              (room) =>
                                room.id ===
                                classroomSlots.find(
                                  (slot) => slot.id === request.scheduleId
                                ).resourceId
                            ).title}
                        </td>
                        <td className="border-0">
                          <span>
                            {classroomSlots.find(
                              (slot) => slot.id === request.scheduleId
                            ) && (
                              <span>{`${format(
                                new Date(
                                  classroomSlots.find(
                                    (slot) => slot.id === request.scheduleId
                                  ).startDate
                                ),
                                "yyyy/MM/dd"
                              )} - ${format(
                                new Date(
                                  classroomSlots.find(
                                    (slot) => slot.id === request.scheduleId
                                  ).endDate
                                ),
                                "yyyy/MM/dd"
                              )}`}</span>
                            )}
                          </span>
                        </td>
                        <td className="border-0">
                          <span>
                            {classroomSlots.find(
                              (slot) => slot.id === request.scheduleId
                            ) && (
                              <span>{`${format(
                                new Date(
                                  0,
                                  0,
                                  0,
                                  classroomSlots.find(
                                    (slot) => slot.id === request.scheduleId
                                  ).startTime
                                ),
                                "h:mm aa"
                              )} - ${format(
                                new Date(
                                  0,
                                  0,
                                  0,
                                  classroomSlots.find(
                                    (slot) => slot.id === request.scheduleId
                                  ).endTime
                                ),
                                "h:mm aa"
                              )}`}</span>
                            )}
                          </span>
                        </td>
                        <td className="border-0">
                          {teachers.find(
                            (teacher) => teacher.id === request.requestedBy
                          ) &&
                            teachers.find(
                              (teacher) => teacher.id === request.requestedBy
                            ).teacherName}
                        </td>

                        <td className="border-0">
                          {" "}
                          {format(Number(request.created), "yyyy/MM/dd")}
                        </td>
                        <td className="border-0">
                          <span
                            className={`badge badge-pill ${
                              request.status === "Approved"
                                ? "badge-success"
                                : request.status === "Rejected"
                                ? "badge-danger"
                                : "badge-warning"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="border-0">
                          <ScheduleToSwapModal
                            name={"View"}
                            title={"Reason"}
                            color={"primary"}
                            teachers={teachers}
                            schedule={
                              classroomSlots.find(
                                (slot) => slot.id === request.scheduleToSwap
                              ) &&
                              classroomSlots.find(
                                (slot) => slot.id === request.scheduleToSwap
                              )
                            }
                          />
                        </td>
                        <td className="border-0">
                          <Reason
                            name={"View"}
                            title={"Reason"}
                            color={"primary"}
                            reason={request.reason}
                          />
                        </td>
                        <td className="border-0">
                          <ImageModal
                            images={request.attachments}
                            name={"View"}
                            title={"Attachments"}
                            color={"primary"}
                          />
                        </td>
                        {request.status === "Rejected" && (
                          <td className="border-0">
                            <Reason
                              name={"View Reject reason"}
                              title={"Rejection reason"}
                              color={"danger"}
                              reason={
                                request.adminReason && request.adminReason
                              }
                            />
                          </td>
                        )}
                        {request.status === "Pending" && (
                          <td className="border-0">
                            <div className="d-flex flex-row">
                              <Button
                                onClick={() =>
                                  handleApprove(
                                    request.id,
                                    request.scheduleId,
                                    request.scheduleToSwap,
                                    token,
                                    dispatch
                                  )
                                }
                                className="px-2 py-1 mr-1"
                                variant="info"
                              >
                                Approve
                              </Button>

                              <SwapReject
                                id={request.id}
                                token={token}
                                dispatch={dispatch}
                                handleReject={handleReject}
                              />
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
          {list.length === 0 && (
            <div className="mx-auto border border-light rounded p-3 pb-0 mb-5">
              <p className="text-center text-muted">No Data Found</p>
            </div>
          )}
        </div>
      </Col>
    </Container>
  );
};

export default SwapListView;
