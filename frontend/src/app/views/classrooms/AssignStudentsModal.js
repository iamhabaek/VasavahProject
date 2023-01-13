import React, { useState, Fragment, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import AppContext from "app/appContext";
import { ContinuousSizeLegend } from "react-vis";

const AssignStudentsModal = ({ assignedStudents }) => {
  const { students, classrooms } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [assigned, setAssigned] = useState(assignedStudents);
  useEffect(() => {
    if (assignedStudents) {
      setAssigned(assignedStudents);
    }
  }, [setAssigned, assignedStudents]);
  const handleClose = () => {
    setShow(false);
  };

  const studentsList = students.filter((student) => {
    return assigned.find((id) => {
      return student.id === id.value;
    });
  });

  return (
    <Fragment>
      <Button
        className="text-capitalize px-2 py-1"
        onClick={() => setShow(true)}
      >
        <i className="i-Eye"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assigned Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {studentsList.map((assign, idx) => (
            <div key={idx}>{`${assign.name}`}</div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
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

export default AssignStudentsModal;
