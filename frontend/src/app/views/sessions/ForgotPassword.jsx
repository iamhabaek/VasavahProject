import React, { Component, useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { Button, Spinner, Alert } from "react-bootstrap";
import AppContext from "app/appContext";
import logo from "../../assets/logo.png";
import { classList } from "@utils";
const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required("email is required"),
});

const ForgotPassword = () => {
  const { resetPassword } = useContext(AppContext);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (values) => {
    const { email } = values;
    setIsLoading(true);
    try {
      await resetPassword(email);
      history.push("/session/signin");
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="auth-layout-wrap" style={{ backgroundColor: "#639" }}>
      <div className="auth-content d-flex flex-column">
        <div className="card o-hidden ">
          <div className="d-flex justify-content-center">
            <div className="col-md-10">
              <div className="p-4">
                <div className="text-center">
                  <img src={logo} className="" />
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <h1 className="mb-3 mt-8 text-13">
                    Check email inbox to reset password
                  </h1>
                  <Link to="/session/signup" className="text-primary">
                    <u>No Account? Sign up here!</u>
                  </Link>
                </div>
                {error && <Alert variant="danger">Email not found</Alert>}
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={ForgotPasswordSchema}
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
                  }) => (
                    <form onSubmit={handleSubmit} className="mb-5">
                      <div
                        className={classList({
                          "input-group": true,
                          "mb-2": true,
                          "invalid-field": errors.email && touched.email,
                        })}
                      >
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            <i className="nav-icon i-Administrator "></i>
                          </span>
                        </div>
                        <input
                          className="form-control form-control position-relative"
                          type="text"
                          placeholder="Enter Email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <div className="invalid-tooltip ml-5">
                          {errors.email}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mt-3 justify-content-between">
                        <Link
                          to="/session/forgot-password"
                          className="text-primary"
                        >
                          <u>Already have an account? Sign in here</u>
                        </Link>
                        <Button
                          disabled={isLoading}
                          variant="primary"
                          type="submit"
                        >
                          {isLoading && (
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
                          Reset Password
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
