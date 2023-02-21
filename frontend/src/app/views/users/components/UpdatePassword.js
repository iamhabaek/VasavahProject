import React, { useState, Fragment } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { classList } from "@utils";
import Swal from "sweetalert2";
import { logout } from "app/services/AuthService";
import firebase from "firebase/app";
const basicFormSchema = yup.object().shape({
  oldPassword: yup.string().required("Current password is empty"),
  newPassword: yup.string().required("New password is empty"),
  confirmPassword: yup
    .string()
    .required("Retype your password")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const UpdatePassword = ({ uid, name, ...props }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = async (values) => {
    const { oldPassword, newPassword } = values;
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );

    user
      .reauthenticateWithCredential(credential)
      .then(function async() {
        // User re-authenticated.
        user
          .updatePassword(newPassword)
          .then(async () => {
            setLoading(true);
            await Swal.fire("Success!", "Password updated", "success");
            setShow(false);
            logout();
            history.push("/session/signin");
          })
          .catch(function (error) {
            Swal.fire("Failed!", "Password not updated", "error");
            console.log(error);
          });
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
      <Link className="text-capitalize" onClick={() => setShow(true)}>
        {name}
      </Link>
      <Modal show={show} onHide={handleClose} {...props}>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
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
                    <i className="i-Lock-2"></i> Change Password
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <span>
                    Please fill all the required (
                    <span className="text-danger">*</span>) fields
                  </span>

                  <div className="form-row mt-2">
                    <div className="form-group col-md-12">
                      <div
                        className={classList({
                          "mx-0": true,
                          "valid-field":
                            !errors.oldPassword && touched.oldPassword,
                          "invalid-field":
                            errors.oldPassword && touched.oldPassword,
                        })}
                      >
                        <label
                          htmlFor="oldPassword"
                          className="font-weight-bold"
                        >
                          Current Password{" "}
                          <span className="text-danger font-weight-bold">
                            *
                          </span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="oldPassword"
                          placeholder="Current password"
                          name="oldPassword"
                          value={values.oldPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <div className="invalid-feedback">
                          {errors.oldPassword}
                        </div>
                      </div>
                      <div
                        className={classList({
                          "mx-0": true,
                          "valid-field":
                            !errors.newPassword && touched.newPassword,
                          "invalid-field":
                            errors.newPassword && touched.newPassword,
                        })}
                      >
                        <label
                          htmlFor="newPassword"
                          className="font-weight-bold"
                        >
                          New Password{" "}
                          <span className="text-danger font-weight-bold">
                            *
                          </span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          placeholder="Current password"
                          name="newPassword"
                          value={values.newPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <div className="invalid-feedback">
                          {errors.newPassword}
                        </div>
                      </div>
                      <div
                        className={classList({
                          "mx-0": true,
                          "valid-field":
                            !errors.confirmPassword && touched.confirmPassword,
                          "invalid-field":
                            errors.confirmPassword && touched.confirmPassword,
                        })}
                      >
                        <label
                          htmlFor="confirmPassword"
                          className="font-weight-bold"
                        >
                          Retype Password{" "}
                          <span className="text-danger font-weight-bold">
                            *
                          </span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Retype password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <div className="invalid-feedback">
                          {errors.confirmPassword}
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

export default UpdatePassword;
