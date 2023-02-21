import React, { useContext, Fragment, useState } from "react";
import { Breadcrumb } from "@gull";
import { Link, useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import { Field, Formik } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "../SharedComponents/CustomSelect";
import "react-datepicker/dist/react-datepicker.css";
import { yearLvlOptions } from "./options";
import { addStudent } from "app/reducers/actions/ClassroomActions";
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
// formik validation schema using yup
const basicFormSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  birthDate: yup.string().required("Birth Date is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone number is required"),
  course: yup.string().required("Course is required"),
  email: yup.string().email().required("email is required"),
  yearLevel: yup.string().required("Year Level is required"),
  gender: yup.string().required("Gender is required"),
  status: yup.string().required("Status is required"),
});
const AddStudentForm = () => {
  // Declare states from context provider
  const { courses, dispatch, user, token } = useContext(AppContext);
  const [loading, setLoading] = useState();
  const history = useHistory();
  // Generate course options
  const options = courses.map((course) => {
    return {
      value: course.courseName,
      label: course.courseName,
    };
  });
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const statusOptions = [
    { value: "Regular", label: "Regular" },
    { value: "Irregular", label: "Irregular" },
  ];
  const initialState = {
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    address: "",
    phone: "",
    course: "",
    email: "",
    yearLevel: "",
    status: "",
  };

  // Submit data to database
  const handleSubmit = async (values) => {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      status,
      address,
      phone,
      course,
      gender,
      yearLevel,
    } = values;
    console.log();
    const name = `${firstName} ${lastName}`;
    // declare student object
    const student = {
      id: nanoid(),
      name: name,
      birthDate: birthDate,
      gender: gender,
      address: address,
      phone: phone,
      course: course,
      status: status,
      yearLevel: yearLevel,
      email: email,
      created: Date.now(),
    };
    const notifications = {
      id: nanoid(),
      created: Date.now(),
      user: user.email,
      isViewed: false,
      action: "add",
      content: {
        name: name,
        location: "student",
        description: "click to see more information",
      },
    };
    setLoading(true);
    await addStudent(student, notifications, token)(dispatch);
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
        history.push("/students/studentslist");
      }
    });
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
        <div className="card-header">
          <strong>
            Please fill all the required (<span className="text-danger">*</span>
            ) fields
          </strong>
        </div>
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
                        First Name (<span className="text-danger">*</span>)
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
                      <div className="invalid-feedback">{errors.firstName}</div>
                    </div>
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.lastName && touched.lastName,
                      })}
                    >
                      <label htmlFor="firstName" className="ul-form__label">
                        Last Name (<span className="text-danger">*</span>)
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
                      <div className="invalid-feedback">{errors.lastName}</div>
                    </div>
                  </div>
                  <div className="custom-separator"></div>
                  <div className="form-row">
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.birthDate && touched.birthDate,
                      })}
                    >
                      <label htmlFor="age" className="ul-form__label">
                        Birth Date (<span className="text-danger">*</span>)
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        name="birthDate"
                        onChange={handleChange}
                        value={values.birthDate}
                      />
                      <div className="invalid-feedback">{errors.birthDate}</div>
                    </div>
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.address && touched.address,
                      })}
                    >
                      <label htmlFor="address" className="ul-form__label">
                        Address (<span className="text-danger">*</span>)
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
                      <div className="invalid-feedback">{errors.address}</div>
                    </div>
                  </div>
                  <div className="custom-separator"></div>

                  <div className="form-row">
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.email && touched.email,
                      })}
                    >
                      <label htmlFor="phone" className="ul-form__label">
                        Email Address (<span className="text-danger">*</span>)
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email Address"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      <div className="invalid-feedback">{errors.email}</div>
                    </div>
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.phone && touched.phone,
                      })}
                    >
                      <label htmlFor="phone" className="ul-form__label">
                        Phone number (<span className="text-danger">*</span>)
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
                      <div className="invalid-feedback">{errors.phone}</div>
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
                        Course (<span className="text-danger">*</span>)
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
                      <div className="invalid-feedback">{errors.course}</div>
                    </div>
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.yearLevel && touched.yearLevel,
                      })}
                    >
                      <label htmlFor="yearLevel" className="ul-form__label">
                        Year Level (<span className="text-danger">*</span>)
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
                      <div className="invalid-feedback">{errors.yearLevel}</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.gender && touched.gender,
                      })}
                    >
                      <label className="ul-form__label">
                        Gender (<span className="text-danger">*</span>)
                      </label>
                      {genderOptions.map((opt, idx) => (
                        <div key={idx}>
                          <Field
                            className="mr-2"
                            type="radio"
                            name="gender"
                            value={opt.value}
                            // onChange={handleChange}
                            checked={values.gender === opt.value}
                          />
                          <label htmlFor="gender" className="ul-form__label">
                            {opt.label}
                          </label>
                        </div>
                      ))}
                      <div className="invalid-feedback">{errors.gender}</div>
                    </div>
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.status && touched.status,
                      })}
                    >
                      <label className="ul-form__label">
                        Status (<span className="text-danger">*</span>)
                      </label>
                      {statusOptions.map((opt, idx) => (
                        <div key={idx}>
                          <Field
                            className="mr-2"
                            type="radio"
                            name="status"
                            value={opt.value}
                            // onChange={handleChange}
                            checked={values.status === opt.value}
                          />
                          <label htmlFor={opt.value} className="ul-form__label">
                            {opt.label}
                          </label>
                        </div>
                      ))}
                      <div className="invalid-feedback">{errors.status}</div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="mc-footer">
                    <div className="row">
                      <div className="col-lg-12 ">
                        <Button
                          disabled={loading}
                          className="mr-2"
                          variant="primary"
                          type="submit"
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
                          Submit
                        </Button>

                        <Button onClick={handleCancel} variant="danger">
                          Cancel
                        </Button>
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
