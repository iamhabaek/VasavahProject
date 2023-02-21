import React, { useState, Fragment, useContext, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { classList } from "@utils";
import { rejectClose } from "app/reducers/actions/ClassroomActions";
const basicFormSchema = yup.object().shape({
  reason: yup.string().required("Reason is required"),
});
const AdminReason = ({ reason, handleReject, id, token, dispatch }) => {
  console.log(id);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    const reject = {
      adminReason: values.reason,
      status: "Rejected",
    };
    setLoading(true);
    await rejectClose(id, reject, token)(dispatch);
    setLoading(false);
  };
  return (
    <Fragment>
      <Button variant="danger" onClick={() => setShow(true)}>
        Reject
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Formik
          initialValues={{
            reason: "",
          }}
          validationSchema={basicFormSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <form
                className="needs-validation"
                onSubmit={handleSubmit}
                noValidate
              >
                <Modal.Header closeButton>
                  <Modal.Title>Reject reason</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <strong>
                    Please fill all the required (
                    <span className="text-danger">*</span>) fields
                  </strong>

                  <div className="form-row">
                    <div
                      className={classList({
                        "col-md-12 mb-3": true,
                        "valid-field": !errors.reason && touched.reason,
                        "invalid-field": errors.reason && touched.reason,
                      })}
                    >
                      <label htmlFor="reason">
                        Reason <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        className="form-control"
                        rows={3}
                        onChange={handleChange}
                        value={values.reason}
                        required
                      />
                      <div className="invalid-feedback">{errors.reason}</div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    disabled={loading}
                    className=" text-12 btn btn-primary mr-2"
                    type="submit"
                  >
                    {loading && (
                      <Spinner
                        size="sm"
                        variant="light"
                        className="mr-1"
                        animation="border"
                      />
                    )}
                    Submit
                  </Button>
                  <Button onClick={handleClose} variant="danger">
                    Cancel
                  </Button>
                </Modal.Footer>
              </form>
            );
          }}
        </Formik>
      </Modal>
    </Fragment>
  );
};

export default AdminReason;
