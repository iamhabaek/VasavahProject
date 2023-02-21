import React, { useState, Fragment, useContext } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { classList } from "@utils";
import Swal from "sweetalert2";
import firebase from "firebase/app";
import AppContext from "app/appContext";
import { updateRole } from "app/reducers/actions/ClassroomActions";
const basicFormSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
});

const Reauthenticate = ({ uid, name, ...props }) => {
  const { token, dispatch } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = async (values) => {
    const { password } = values;

    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );

    user
      .reauthenticateWithCredential(credential)
      .then(async () => {
        // User re-authenticated.
        const newRole = "_admin";
        setLoading(true);
        updateRole(uid, newRole, token)(dispatch);
      })
      .catch(function (error) {
        Swal.fire(
          "Failed!",
          "Incorrect current password please try again",
          "error"
        );
        console.log(error);
      });
    setLoading(false);
  };
  return (
    <Fragment>
      <Button
        className="text-capitalize"
        variant="info"
        onClick={() => setShow(true)}
      >
        {name}
      </Button>
      <Modal show={show} onHide={handleClose} {...props}>
        <Formik
          initialValues={{
            password: "",
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
                  <Modal.Title>
                    <i className="i-Lock-2"></i> Authentication
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <span>
                    Please re-enter your password to proceed in making the user
                    as admin.
                  </span>

                  <div className="form-row mt-2">
                    <div className="form-group col-md-12">
                      <div
                        className={classList({
                          "mx-0": true,
                          "valid-field": !errors.password && touched.password,
                          "invalid-field": errors.password && touched.password,
                        })}
                      >
                        <label
                          htmlFor="oldPassword"
                          className="font-weight-bold"
                        >
                          Password{" "}
                          <span className="text-danger font-weight-bold">
                            *
                          </span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button disabled={loading} variant="info" type="submit">
                    {loading && (
                      <Spinner
                        as="span"
                        variant="light"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        animation="border"
                        className="mr-1"
                      />
                    )}
                    Save Changes
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

export default Reauthenticate;
