import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import AppContext from "app/appContext";
import admin from "app/mockDb";
import { classList } from "@utils";
const SigninSchema = yup.object().shape({
  email: yup.string().email().required("email is required"),
  password: yup.string().min(8).required("password is required"),
  confirmPassword: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const [error, setError] = useState();
  const { signup } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setIsLoading(true);
    try {
      await signup(email, password);
      history.push("/classrooms/classrooms-list");
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
                  <h1 className="mb-3 mt-8 text-13">Fill out all fields</h1>
                </div>

                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
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
                          placeholder="Email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <div className="invalid-tooltip ml-5">
                          {errors.email}
                        </div>
                      </div>

                      <div
                        className={classList({
                          "input-group": true,
                          "mt-3": true,
                          "invalid-field": errors.password && touched.password,
                        })}
                      >
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            <i className="nav-icon i-Lock-2"></i>
                          </span>
                        </div>
                        <input
                          className="form-control form-control"
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder="Password"
                        />
                        <div className="invalid-tooltip ml-5">
                          {errors.password}
                        </div>
                      </div>

                      <div
                        className={classList({
                          "input-group": true,
                          "mt-3": true,
                          "invalid-field":
                            errors.confirmPassword && touched.confirmPassword,
                        })}
                      >
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            <i className="nav-icon i-Lock-2"></i>
                          </span>
                        </div>
                        <input
                          className="form-control form-control"
                          placeholder="Confirm Password"
                          type="password"
                          name="confirmPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmPassword}
                        />
                        <div className="invalid-tooltip ml-5">
                          {errors.confirmPassword}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mt-3 justify-content-between">
                        <Link className="text-underline" to="/session/signin">
                          Already Have an Accout? Sign In here
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
                          Submit
                        </Button>
                        {/* <button className="btn btn-primary mt-2" type="submit">
                        Login
                      </button> */}
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

export default Signup;
