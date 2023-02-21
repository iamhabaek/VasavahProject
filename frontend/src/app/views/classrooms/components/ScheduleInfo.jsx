import React, { useState, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { useContext } from "react";
import { Badge } from "react-bootstrap";
// Modal for list occupied slot
const ScheduleInfo = ({
  handleCloseScheduleModal,
  showScheduleInfo,
  data,
  teachers,
  token,
  dispatch,
  cancelSchedule,
  user,
}) => {
  return (
    <Fragment>
      <div>
        {data.length !== 0 && (
          <Modal
            show={showScheduleInfo}
            onHide={handleCloseScheduleModal}
            size="lg"
            scrollable={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <i className="i-Over-Time-2"></i> Schedule Information
              </Modal.Title>
            </Modal.Header>
            {data && (
              <Modal.Body>
                <div className="row p-3">
                  <div className="col-lg-3">
                    <div className="form-group">
                      <span>Time:</span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <span>{`${data.startTime} - ${data.endTime}`}</span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <span>Status:</span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <Badge
                        pill
                        variant={data.isApproved ? "success" : "warning"}
                        className="m-1"
                      >
                        {data.isApproved ? "Approved" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <span>Occupied by:</span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <span>
                        {teachers.find((teacher) => teacher.id === data.teacher)
                          ? teachers.find(
                              (teacher) => teacher.id === data.teacher
                            ).teacherName
                          : "-"}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <span>Subject:</span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <span>{data.subject.label}</span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <span>Course:</span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">{data.course.label}</div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <span>Year Level:</span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">{data.yearLevel.label}</div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <span>Days:</span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <span>
                        {" "}
                        {data.days.map((day, idx) => (
                          <span key={idx}>{day}, </span>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="custom-separator"></div>
                </div>
              </Modal.Body>
            )}
            <Modal.Footer>
              {user && user.uid === data.teacher && !data.isApproved && (
                <Button
                  variant="danger"
                  className=".px-2 .py-1"
                  onClick={() => cancelSchedule(data.id, token, dispatch)}
                >
                  Cancel Application
                </Button>
              )}
              <Button
                variant="primary"
                className=".px-2 .py-1"
                onClick={handleCloseScheduleModal}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </Fragment>
  );
};

export default ScheduleInfo;
