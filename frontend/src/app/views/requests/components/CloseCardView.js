import React from "react";
import LetteredAvatar from "react-lettered-avatar";
import { format } from "date-fns";
import { Col, Container, Button } from "react-bootstrap";
import Reason from "../../SharedComponents/Reason";
import ImageModal from "../../SharedComponents/ImageModal";
const CloseCardView = ({
  list,
  user,
  cancelRequest,
  token,
  classrooms,
  teachers,
  dispatch,
  loading,
}) => {
  return (
    <div>
      <Container>
        <Col lg={12} md={12} sm={8} xs={12} className="mb-4">
          <div className="row">
            {list.map((request) => (
              <div
                key={request.id}
                className="app-card text-sm col-lg-4 col-sm-4"
              >
                <div className=" border-none shadow card">
                  <div className="clearFix">
                    <div
                      className={`${
                        request.status === "Approved"
                          ? "text-success"
                          : request.status === "Rejected"
                          ? "text-danger"
                          : "text-warning"
                      } float-left p-2`}
                    >
                      <strong>{request.status}</strong>
                    </div>
                  </div>

                  <div className=".d-block mx-auto mw-100 p-3">
                    <LetteredAvatar
                      backgroundColor="#55535F"
                      color="#fff"
                      size={80}
                      name={
                        teachers.find(
                          (teacher) => teacher.id === request.requestedBy
                        ) &&
                        teachers.find(
                          (teacher) => teacher.id === request.requestedBy
                        ).teacherName
                      }
                    />
                  </div>
                  <div
                    style={{ backgroundColor: "#E7E5F1" }}
                    className=".d-block mw-100 "
                  >
                    <p className="font-weight-bold text-15 text-center p-2">{`${
                      teachers.find(
                        (teacher) => teacher.id === request.requestedBy
                      ) &&
                      teachers.find(
                        (teacher) => teacher.id === request.requestedBy
                      ).teacherName
                    }`}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                    <span className="text-12 font-weight-bold ">
                      Date requested:
                    </span>
                    <span className="text-12">
                      {format(Number(request.created), "yyyy/MM/dd")}
                    </span>
                  </div>

                  <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                    <span className="text-12 font-weight-bold ">Room:</span>
                    <span className="text-12">
                      {classrooms.find(
                        (room) => room.id === request.resourceId
                      ) &&
                        classrooms.find(
                          (room) => room.id === request.resourceId
                        ).title}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                    <span className="text-12 font-weight-semibold ">Date:</span>
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
                  </div>
                  <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                    <span className="text-12 font-weight-semibold ">Time:</span>
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
                  </div>

                  <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                    <span className="text-12 font-weight-semibold ">
                      Reason:
                    </span>
                    <Reason
                      name={"View"}
                      title={"Reason"}
                      color={"primary"}
                      reason={request.reason}
                    />
                  </div>
                  <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                    <span className="text-12 font-weight-semibold ">
                      Attachment:
                    </span>
                    {request.attachments ? (
                      <ImageModal
                        images={request.attachments}
                        name={"View"}
                        title={"Attachments"}
                        color={"primary"}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  {request.status === "Rejected" && (
                    <div className="d-flex flex-row justify-content-between py-2 px-2 align-items-center">
                      <span className="text-12 font-weight-semibold ">
                        Rejection Reason:
                      </span>
                      <Reason
                        name={"View"}
                        title={"Reject Reason"}
                        color={"danger"}
                        reason={request.adminReason}
                      />
                    </div>
                  )}
                  {request.status === "Pending" &&
                    user &&
                    user.uid === request.requestedBy && (
                      <div className="card-footer">
                        <div className="mc-footer">
                          <div className="d-flex flex-row justify-content-center align-items-center">
                            <Button
                              variant="danger"
                              className=".px-2 .py-1"
                              disabled={loading}
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
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </Col>
        {list.length === 0 && (
          <div className="d-flex justify-content-center p-3 pb-0 mb-5">
            <p className="text-center text-muted">No Data Found</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CloseCardView;
