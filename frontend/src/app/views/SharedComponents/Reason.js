import React, { useState, Fragment, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import AppContext from "app/appContext";
// Modal for showing student assigned
const Reason = ({ reason, name, color, title }) => {
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
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>{reason}</span>
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

export default Reason;
