import React, { useState, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { useContext } from "react";
import AppContext from "app/appContext";
const ClassroomOccupied = ({ classroomId }) => {
  const { classroomSlots } = useContext(AppContext);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const classroomSlot = classroomSlots.filter(
    (classroomSlot) => classroomSlot.classroomId === classroomId
  );
  console.log(classroomSlot);
  console.log(classroomId);
  return (
    <Fragment>
      <Button className="text-12 px-2 py-1" onClick={() => setShow(true)}>
        View
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Occupied Hours</Modal.Title>
        </Modal.Header>
        {classroomSlots ? (
          <Modal.Body>
            {classroomSlot.map((data) => (
              <div key={data.id} className="mb-5">
                <div>
                  <span>{`Time: ${data.startTime} - ${data.endTime}`}</span>
                </div>
                <div>
                  <span>Occupied by:{data.teacher} </span>
                </div>
                <div>
                  <span>Subject:{data.subject}</span>
                </div>
                <div>
                  <span>Course:{data.course}</span>
                </div>
                <div>
                  <span>{`Year Level: ${data.yearLevel}`}</span>
                </div>
                <div>
                  <span>{data.day}</span>
                </div>
              </div>
            ))}
          </Modal.Body>
        ) : (
          ""
        )}
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

export default ClassroomOccupied;
