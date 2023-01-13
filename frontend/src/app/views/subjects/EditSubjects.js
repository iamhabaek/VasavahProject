import React, { useContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import { Formik } from "formik";
import Swal from "sweetalert2";
// create axios function
import api from "app/api/api";
import { NotificationManager } from "react-notifications";
import { updateSubject } from "app/reducers/actions/ClassroomActions";

// Validation schema
const basicFormSchema = yup.object().shape({
  subjectName: yup.string().required("Subject Name is required"),
  units: yup.string().required("Unitsis required"),
});

const EditSubjects = () => {
  const history = useHistory();
  // Decclare states from context provider
  const { dispatch, subjects } = useContext(AppContext);

  const { id } = useParams();

  const subject = subjects.find((subject) => subject.id === id);

  // Submit update function
  const handleSubmit = async (values) => {
    const { subjectName, units } = values;
    const updatedSubject = {
      subjectName: subjectName,
      units: units,
    };

    updateSubject(id, updatedSubject)(dispatch);
  };
  // Cancel edit redirect to list page
  const handleCancel = () => {
    history.push("/subjects/subjects-list");
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Edit Student" }]}
      />
      {subject && (
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
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
                          <label htmlFor="courseName">Subject Name</label>
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
                          <label htmlFor="validationCustom202">Units</label>
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
                            Unitsis required
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-success mr-2" type="submit">
                        Save
                      </button>
                      <button onClick={handleCancel} className="btn btn-danger">
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

export default EditSubjects;
