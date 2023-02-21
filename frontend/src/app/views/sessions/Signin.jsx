import React, { Component, useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { Button, Spinner, Alert } from "react-bootstrap";
import AppContext from "app/appContext";
import logo from "../../assets/smudge.jpg";

import { classList } from "@utils";
const SigninSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Please fill out the email field"),
  password: yup.string().required("Please fill out the password field"),
});

const Signin = () => {
  const { login, user } = useContext(AppContext);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setIsLoading(true);
    try {
      await login(email, password);
      history.push("/classrooms/schedule");
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
                  <img src={logo} />
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <h1 className="mb-3 mt-8 text-13">Sign in to your account</h1>
                </div>
                {error && (
                  <Alert variant="danger">Invalid email or password</Alert>
                )}
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={SigninSchema}
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
                          "invalid-field": errors.email,
                        })}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
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
                        <div className="invalid-feedback ml-5">
                          {errors.email}
                        </div>
                      </div>

                      <div
                        className={classList({
                          "input-group": true,
                          "mt-3": true,
                          "invalid-field": errors.password,
                        })}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="nav-icon i-Lock-2"></i>
                          </span>
                        </div>
                        <input
                          className="form-control form-control"
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        <div className="invalid-feedback ml-5">
                          {errors.password}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mt-3 justify-content-between">
                        <Link
                          to="/session/forgot-password"
                          className="text-primary"
                        >
                          <u>Forgot Password?</u>
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
                          Login
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

export default Signin;
