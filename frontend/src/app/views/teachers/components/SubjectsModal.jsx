import React, { useState, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";

const SubjectsModal = ({ subjects }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Fragment>
      <Button
        className="text-capitalize px-2 py-1"
        onClick={() => setShow(true)}
      >
        view
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subject Lists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {subjects.map((subject, idx) => (
            <div className="mb-2" key={idx}>
              {subject}
            </div>
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

export default SubjectsModal;
