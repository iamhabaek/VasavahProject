import React, { useContext, useState, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import AppContext from "app/appContext";
import { Formik } from "formik";
import { classList } from "@utils";
import Swal from "sweetalert2";
import * as yup from "yup";
import { updateCourse } from "app/reducers/actions/ClassroomActions";
import { nanoid } from "nanoid";
import { Button, Spinner } from "react-bootstrap";

// validation schema

const basicFormSchema = yup.object().shape({
  courseName: yup.string().required("Course Name is required"),
  yearsToFinish: yup.string().required("Years to Finish is required"),
});

const EditCourse = () => {
  const history = useHistory();
  //states from context provider
  const { courses, user, dispatch, token } = useContext(AppContext);
  // destructure params hook and take id
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // find course
  const course = courses.find((course) => course.id === id);
  // submit update to database
  const handleSubmit = async (values) => {
    //destructure values
    const { courseName, yearsToFinish } = values;
    // course object
    const updatedCourse = {
      id: id,
      courseName: courseName,
      yearsToFinish: Number(yearsToFinish),
    };
    const notifications = {
      id: nanoid(),
      created: Date.now(),
      user: user.email,
      isViewed: false,
      action: "update",
      content: {
        name: courseName,
        location: "course",
        description: "to see more information",
      },
    };
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await updateCourse(id, updatedCourse, notifications, token)(dispatch);
          await Swal.fire("Updated!", "Course has been updated.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });

    setLoading(false);
  };
  // cancel edit redirect to courses list
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
        routeSegments={[{ name: "Home", path: "/" }, { name: "Edit Course" }]}
      />
      {course && (
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <strong>
                Please fill all the required (
                <span className="text-danger">*</span>) fields
              </strong>
            </div>
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
                    <div className="card-body">
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
                            "col-md-4 mb-3": true,
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
                            Years to Finish is required
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="mc-footer">
                        <Button
                          disabled={loading}
                          variant="success"
                          type="submit"
                          className="mr-2"
                        >
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
      )}
    </Fragment>
  );
};

export default EditCourse;
