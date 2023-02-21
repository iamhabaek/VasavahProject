import React, { useContext, useState, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import { Formik } from "formik";
import { updateSubject } from "app/reducers/actions/ClassroomActions";
import { nanoid } from "nanoid";
import { Button, Spinner } from "react-bootstrap";

import Swal from "sweetalert2";
// Validation schema
const basicFormSchema = yup.object().shape({
  subjectName: yup.string().required("Subject Name is required"),
  units: yup.string().required("Unitsis required"),
});

const EditSubjects = () => {
  const history = useHistory();
  // Decclare states from context provider
  const { dispatch, user, subjects, token } = useContext(AppContext);

  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const subject = subjects.find((subject) => subject.id === id);

  // Submit update function
  const handleSubmit = async (values) => {
    const { subjectName, units } = values;
    const updatedSubject = {
      subjectName: subjectName,
      units: units,
    };
    const notifications = {
      id: nanoid(),
      created: Date.now(),
      user: user.email,
      isViewed: false,
      action: "update",
      content: {
        name: subjectName,
        location: "subject",
        description: "click to see more information",
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
          await updateSubject(
            id,
            updatedSubject,
            notifications,
            token
          )(dispatch);
          await Swal.fire("Updated!", "Subject has been updated.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });

    setLoading(false);
  };

  // Cancel edit redirect to list page
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
        routeSegments={[{ name: "Home", path: "/" }, { name: "Edit Subject" }]}
      />
      {subject && (
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <strong>
                Please fill all the required (
                <span className="text-danger">*</span>) fields
              </strong>
            </div>
            <Formik
              initialValues={subject}
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
                              !errors.subjectName && touched.subjectName,
                            "invalid-field":
                              errors.subjectName && touched.subjectName,
                          })}
                        >
                          <label htmlFor="courseName">
                            Subject Name (<span className="text-danger">*</span>
                            )
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
                            "col-md-4 mb-3": true,
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

export default EditSubjects;
