import React, { useState, useContext, createContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { nanoid } from "nanoid";
import { Formik } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import { Spinner, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
// Create axios
import { addSubject } from "app/reducers/actions/ClassroomActions";
// validations schema
const basicFormSchema = yup.object().shape({
  subjectName: yup.string().required("Subject Name is required"),
  units: yup.string().required("Units is required"),
});

const AddSubject = () => {
  // Declare states from context provider
  const { dispatch, user, token } = useContext(AppContext);
  const [loading, setLoading] = useState();
  const history = useHistory();
  // Submit data
  const handleSubmit = async (values) => {
    const { subjectName, units } = values;
    const subject = {
      id: nanoid(),
      subjectName: subjectName,
      units: units,
      created: Date.now(),
    };
    const notifications = {
      id: nanoid(),
      created: Date.now(),
      user: user.email,
      isViewed: false,
      action: "add",
      content: {
        name: subjectName,
        location: "subject",
        description: "click to see more information",
      },
    };
    setLoading(true);
    await addSubject(subject, notifications, token)(dispatch);
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
        history.push("/subjects/subjects-list");
      }
    });
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Add Subject" }]}
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
              subjectName: "",
              units: "",
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
                  {" "}
                  <div className="card-body">
                    <div className="form-row">
                      <div
                        className={classList({
                          "col-md-6 mb-3": true,
                          "valid-field":
                            !errors.subjectName && touched.subjectName,
                          "invalid-field":
                            errors.subjectName && touched.subjectName,
                        })}
                      >
                        <label htmlFor="courseName">
                          Subject Name (<span className="text-danger">*</span>)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="subjectName"
                          placeholder="Subject Name"
                          name="subjectName"
                          value={values.subjectName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <div className="invalid-feedback">
                          Subject name is required
                        </div>
                      </div>
                      <div
                        className={classList({
                          "col-md-6 mb-3": true,
                          "valid-field": !errors.units && touched.units,
                          "invalid-field": errors.units && touched.units,
                        })}
                      >
                        <label htmlFor="validationCustom202">
                          Units (<span className="text-danger">*</span>)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="units"
                          placeholder="Units"
                          name="units"
                          value={values.units}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <div className="invalid-feedback">
                          Units is required
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="mc-footer">
                      <Button
                        disabled={loading}
                        className="btn btn-primary m-2"
                        type="submit"
                      >
                        Submit
                        {loading && (
                          <Spinner
                            size="sm"
                            variant="light"
                            className="mr-1"
                            animation="border"
                          />
                        )}
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

export default AddSubject;
