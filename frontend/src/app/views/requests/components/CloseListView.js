import React, { useState } from "react";
import { Col, Container, Button } from "react-bootstrap";
import { format } from "date-fns";
import Reason from "../../SharedComponents/Reason";
import ImageModal from "../../SharedComponents/ImageModal";
const CloseListView = ({
  list,
  classrooms,
  teachers,
  search,
  user,
  token,
  dispatch,
  cancelRequest,
  loading,
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
    "REASON",
    "ATTACHMENTS",
    "REJECT REASON",
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
                            (room) => room.id === request.resourceId
                          ) &&
                            classrooms.find(
                              (room) => room.id === request.resourceId
                            ).title}
                        </td>
                        <td className="border-0">
                          <span>
                            {
                              <span>{`${format(
                                new Date(Number(request.startDate)),
                                "yyyy/MM/dd"
                              )} - ${format(
                                new Date(Number(request.endDate)),
                                "yyyy/MM/dd"
                              )}`}</span>
                            }
                          </span>
                        </td>
                        <td className="border-0">
                          <span>
                            {
                              <span>{`${format(
                                new Date(0, 0, 0, Number(request.startTime)),
                                "h:mm aa"
                              )} - ${format(
                                new Date(0, 0, 0, Number(request.endTime)),
                                "h:mm aa"
                              )}`}</span>
                            }
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
                          <Reason
                            name={"View"}
                            title={"Reason"}
                            color={"primary"}
                            reason={request.reason}
                          />
                        </td>
                        {request.attachments ? (
                          <td className="border-0">
                            <ImageModal
                              images={request.attachments}
                              name={"View"}
                              title={"Attachments"}
                              color={"primary"}
                            />
                          </td>
                        ) : (
                          <td></td>
                        )}
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
                        {request.status === "Pending" &&
                          user &&
                          user.uid === request.requestedBy && (
                            <td className="border-0">
                              <Button
                                disabled={loading}
                                variant="danger"
                                className=".px-2 .py-1"
                                onClick={() =>
                                  cancelRequest(
                                    request.id,
                                    request.type,
                                    token,
                                    dispatch
                                  )
                                }
                              >
                                Cancel Request
                              </Button>
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

export default CloseListView;
