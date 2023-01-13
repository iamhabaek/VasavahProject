import React, { useContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import AppContext from "app/appContext";
import { Formik } from "formik";
import { classList } from "@utils";
import * as yup from "yup";
// crate axios function
import api from "app/api/api";
import { NotificationManager } from "react-notifications";
import Swal from "sweetalert2";
import { updateCourse } from "app/reducers/actions/ClassroomActions";
// validation schema

const basicFormSchema = yup.object().shape({
  courseName: yup.string().required("Course Name is required"),
  yearsToFinish: yup.string().required("Years to Finish is required"),
});

const EditCourse = () => {
  const history = useHistory();
  //states from context provider
  const { courses, dispatch } = useContext(AppContext);
  // destructure params hook and take id
  const { id } = useParams();
  // find course
  const course = courses.find((course) => course.id === id);
  // submit update to database
  const handleSubmit = async (values) => {
    //destructure values
    const { courseName, yearsToFinish } = values;
    // course object
    const updatedCourse = {
      courseName: courseName,
      yearsToFinish: Number(yearsToFinish),
    };
    updateCourse(id, updatedCourse)(dispatch);
  };
  // cancel edit redirect to courses list
  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/courses/courses-list");
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Edit Student" }]}
      />
      {course && (
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <Formik
                initialValues={course}
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
                            Years to Finish is required
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-success text-12 mr-2">
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn text-12 btn-danger"
                      >
                        Cancel
                      </button>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditCourse;
