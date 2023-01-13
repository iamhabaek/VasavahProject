import React, { useState, useContext, createContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import { Formik } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import Swal from "sweetalert2";
// Create axios function
import api from "app/api/api";
import { addCourse } from "app/reducers/actions/ClassroomActions";
// validation schema
const basicFormSchema = yup.object().shape({
  courseName: yup.string().required("Course Name is required"),
  yearsToFinish: yup.string().required("Number Of Years is required"),
});

const AddCourse = () => {
  // States from context provider
  const { courses, dispatch } = useContext(AppContext);
  const history = useHistory();
  const [loading, setLoading] = useState();
  // submit data function
  const handleSubmit = async (values, actions) => {
    // Destructure values
    const { courseName, yearsToFinish } = values;

    // course object
    const course = {
      id: nanoid(),
      courseName: courseName,
      yearsToFinish: Number(yearsToFinish),
    };
    setLoading(true);
    addCourse(course)(dispatch);
    setLoading(false);
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Add Courses" }]}
      />

      <div className="col-md-8">
        <div className="card mb-4">
          <div className="card-body">
            <Formik
              initialValues={{
                courseName: "",
                yearsToFinish: "",
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
                    <div className="form-row">
                      <div
                        className={classList({
                          "col-md-4 mb-3": true,
                          "valid-field":
                            !errors.courseName && touched.courseName,
                          "invalid-field":
                            errors.courseName && touched.courseName,
                        })}
                      >
                        <label htmlFor="courseName">Course Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="courseName"
                          placeholder="Course Name"
                          name="courseName"
                          value={values.courseName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <div className="invalid-feedback">
                          Course name is required
                        </div>
                      </div>
                      <div
                        className={classList({
                          "col-md-4 mb-3": true,
                          "valid-field":
                            !errors.yearsToFinish && touched.yearsToFinish,
                          "invalid-field":
                            errors.yearsToFinish && touched.yearsToFinish,
                        })}
                      >
                        <label htmlFor="validationCustom202">
                          Years To Finish
                        </label>
                        <select
                          className="form-control"
                          value={values.yearsToFinish}
                          onChange={handleChange}
                          name="yearsToFinish"
                          id="yearsToFinish"
                        >
                          <option value="">Select Here</option>
                          <option value="4">4 Years</option>
                          <option value="5">5 Years</option>
                        </select>
                        <div className="invalid-feedback">
                          Years To Finish is required
                        </div>
                      </div>
                    </div>
                    <Button
                      disabled={loading}
                      className=" text-12 btn btn-primary m-1"
                      type="submit"
                    >
                      Submit
                      {loading && (
                        <Spinner
                          size="sm"
                          variant="light"
                          className="mr-1"
                          animation="grow"
                        />
                      )}
                    </Button>
                    <Link to="/courses/courses-list">
                      <button
                        type="button"
                        className="btn text-12 btn-outline-secondary m-1"
                      >
                        Cancel
                      </button>
                    </Link>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCourse;
