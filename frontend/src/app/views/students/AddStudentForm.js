import React, { useContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { Link, useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import { Formik } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "./CustomSelect";
import { genderOptions, yearLvlOptions } from "./options";
import { NotificationManager } from "react-notifications";
import { Spinner, Button } from "react-bootstrap";
import { addStudent } from "app/reducers/actions/ClassroomActions";
// create axios call
import api from "app/api/api";
import { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
// formik validation schema using yup
const basicFormSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  age: yup.number().required("Age is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone number is required"),
  course: yup.string().required("Course is required"),
  yearLevel: yup.string().required("Year Level is required"),
  gender: yup.string().required("Gender is required"),
});
const AddStudentForm = () => {
  // Declare states from context provider
  const { isError, isSuccess, message, courses, dispatch } =
    useContext(AppContext);
  const [loading, setLoading] = useState();
  const history = useHistory();

  // Generate course options
  const options = courses.map((course) => {
    return {
      value: course.courseName,
      label: course.courseName,
    };
  });
  const initialState = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    course: "",
    yearLevel: "",
  };

  // Submit data to database
  const handleSubmit = async (values) => {
    const {
      firstName,
      lastName,
      age,
      address,
      phone,
      course,
      gender,
      yearLevel,
    } = values;
    console.log(values);
    const name = `${firstName} ${lastName}`;
    // declare student object
    const student = {
      id: nanoid(),
      name: name,
      age: age,
      gender: gender,
      address: address,
      phone: phone,
      course: course,
      yearLevel: yearLevel,
    };
    setLoading(true);
    await addStudent(student)(dispatch);
    setLoading(false);
  };

  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Students List", path: "/students/studentslist" },
          { name: "Add Student" },
        ]}
      />
      <div className="card">
        <Formik
          initialValues={initialState}
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
            setFieldValue,
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
                        "form-group col-md-6": true,
                        "invalid-field": errors.firstName && touched.firstName,
                      })}
                    >
                      <label htmlFor="firstName" className="ul-form__label">
                        First Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      <div className="invalid-feedback">
                        First name is required
                      </div>
                    </div>
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.lastName && touched.lastName,
                      })}
                    >
                      <label htmlFor="firstName" className="ul-form__label">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      <div className="invalid-feedback">
                        Last name is required
                      </div>
                    </div>
                  </div>
                  <div className="custom-separator"></div>
                  <div className="form-row">
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.age && touched.age,
                      })}
                    >
                      <label htmlFor="age" className="ul-form__label">
                        Age:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        placeholder="Age"
                        name="age"
                        value={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      <div className="invalid-feedback">Age is required</div>
                    </div>
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.gender && touched.gender,
                      })}
                    >
                      <label htmlFor="gender" className="ul-form__label">
                        Gender:
                      </label>
                      <CustomSelect
                        name="gender"
                        options={genderOptions}
                        onChange={(value) =>
                          setFieldValue("gender", value.value)
                        }
                        value={values.gender}
                        required
                      />
                      <div className="invalid-feedback">Gender is required</div>
                    </div>
                  </div>
                  <div className="custom-separator"></div>
                  <div className="form-row">
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.address && touched.address,
                      })}
                    >
                      <label htmlFor="address" className="ul-form__label">
                        Address:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      <div className="invalid-feedback">
                        Address is required
                      </div>
                    </div>
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.phone && touched.phone,
                      })}
                    >
                      <label htmlFor="phone" className="ul-form__label">
                        Phone number:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Phone number"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      <div className="invalid-feedback">
                        Phone number is required
                      </div>
                    </div>
                  </div>
                  <div className="custom-separator"></div>
                  <div className="form-row">
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.course && touched.course,
                      })}
                    >
                      <label htmlFor="course" className="ul-form__label">
                        Course:
                      </label>
                      <CustomSelect
                        name="course"
                        options={options}
                        onChange={(value) =>
                          setFieldValue("course", value.value)
                        }
                        value={values.course}
                        required
                      />
                      <div className="invalid-feedback">Course is required</div>
                    </div>
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.yearLevel && touched.yearLevel,
                      })}
                    >
                      <label htmlFor="yearLevel" className="ul-form__label">
                        Year Level:
                      </label>
                      <CustomSelect
                        name="yearLevel"
                        options={yearLvlOptions}
                        onChange={(value) =>
                          setFieldValue("yearLevel", value.value)
                        }
                        value={values.yearLevel}
                        required
                      />
                      <div className="invalid-feedback">
                        Year Level is required
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="mc-footer">
                    <div className="row">
                      <div className="col-lg-12 ">
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
                        <Link to="/students/studentslist">
                          <button
                            type="button"
                            className="btn btn-outline-secondary m-1"
                          >
                            Cancel
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Fragment>
  );
};

export default AddStudentForm;
