import React, { useState, useContext, createContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import { Formik } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import { NotificationManager } from "react-notifications";
import { Spinner, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
// Create axios
import api from "app/api/api";
import { addSubject } from "app/reducers/actions/ClassroomActions";
// validations schema
const basicFormSchema = yup.object().shape({
  subjectName: yup.string().required("Subject Name is required"),
  units: yup.string().required("Units is required"),
});

const AddSubject = () => {
  // Declare states from context provider
  const { subjects, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState();

  // Submit data
  const handleSubmit = async (values) => {
    const { subjectName, units } = values;
    const subject = {
      id: nanoid(),
      subjectName: subjectName,
      units: units,
    };
    setLoading(true);
    addSubject(subject)(dispatch);
    setLoading(false);
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Add Subject" }]}
      />

      <div className="col-md-8">
        <div className="card mb-4">
          <div className="card-body">
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
                          Units is required
                        </div>
                      </div>
                    </div>
                    <Button
                      disabled={loading}
                      className="btn btn-primary m-1"
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
                    <Link to="/subjects/subjects-list">
                      <button
                        type="button"
                        className="btn btn-outline-secondary m-1"
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

export default AddSubject;
