import React, { useState, useContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import { Formik } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { addCourse } from "app/reducers/actions/ClassroomActions";
import Swal from "sweetalert2";
// validation schema
const basicFormSchema = yup.object().shape({
  courseName: yup.string().required("Course Name is required"),
  yearsToFinish: yup.string().required("Number Of Years is required"),
});

const AddCourse = () => {
  // States from context provider
  const { dispatch, token, user } = useContext(AppContext);
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
      created: Date.now(),
    };
    const notifications = {
      id: nanoid(),
      created: Date.now(),
      user: user.email,
      isViewed: false,
      action: "add",
      content: {
        name: courseName,
        location: "course",
        description: "click to see more information",
      },
    };
    setLoading(true);
    await addCourse(course, notifications, token)(dispatch);
    setLoading(false);
  };
  const handleCancel = async () => {
    Swal.fire({
      title: "Confirm to cancel",
      text: "Are you sure you want to cancel? If you cancel, all information that you have entered will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/courses/courses-list");
      }
    });
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Add Course" }]}
      />

      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <strong>
              Please fill all the required (
              <span className="text-danger">*</span>) fields
            </strong>
          </div>

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
                  <div className="card-body">
                    <div className="form-row">
                      <div
                        className={classList({
                          "col-md-6 mb-3": true,
                          "valid-field":
                            !errors.courseName && touched.courseName,
                          "invalid-field":
                            errors.courseName && touched.courseName,
                        })}
                      >
                        <label htmlFor="courseName">
                          Course Name (<span className="text-danger">*</span>)
                        </label>
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
                          "col-md-6 mb-3": true,
                          "valid-field":
                            !errors.yearsToFinish && touched.yearsToFinish,
                          "invalid-field":
                            errors.yearsToFinish && touched.yearsToFinish,
                        })}
                      >
                        <label htmlFor="validationCustom202">
                          Years To Finish (
                          <span className="text-danger">*</span>)
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
                  </div>
                  <div className="card-footer">
                    <div className="mc-footer">
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
                      <Button onClick={handleCancel} variant="danger">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCourse;
