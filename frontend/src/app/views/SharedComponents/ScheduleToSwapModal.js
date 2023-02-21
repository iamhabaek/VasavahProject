import React, { useState, Fragment, useContext, useEffect } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { format } from "date-fns";
// Modal for showing student assigned
const ScheduleToSwapModal = ({ schedule, teachers, name, color, title }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Fragment>
      <Button
        className="text-capitalize px-2 py-1"
        variant={color}
        onClick={() => setShow(true)}
      >
        {name}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Modal.Header>
            <Modal.Title>
              <i className="i-Over-Time-2"></i> Schedule Information
            </Modal.Title>
          </Modal.Header>
          {schedule && (
            <Modal.Body>
              <div className="row p-3">
                <div className="col-lg-3">
                  <div className="form-group">
                    <span>Date:</span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">
                    <span>{`${format(
                      new Date(schedule.startDate),
                      "yyyy/MM/dd"
                    )} - ${format(
                      new Date(schedule.endDate),
                      "yyyy/MM/dd"
                    )}`}</span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">
                    <span>Time:</span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">
                    <span>{`${format(
                      new Date(0, 0, 0, schedule.startTime),
                      "h:mm aa"
                    )} - ${format(
                      new Date(0, 0, 0, schedule.endTime),
                      "h:mm aa"
                    )}`}</span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">
                    <span>Teacher:</span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">
                    <span>
                      {teachers.find(
                        (teacher) => teacher.id === schedule.teacher
                      )
                        ? teachers.find(
                            (teacher) => teacher.id === schedule.teacher
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
                    <span>{schedule.subject.label}</span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">
                    <span>Course:</span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">{schedule.course.label}</div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">
                    <span>Year Level:</span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">{schedule.yearLevel.label}</div>
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
                      {schedule.days.map((day, idx) => (
                        <span key={idx}>{day}, </span>
                      ))}
                    </span>
                  </div>
                </div>
                <div className="custom-separator"></div>
              </div>
            </Modal.Body>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className=".px-2 .py-1"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ScheduleToSwapModal;
