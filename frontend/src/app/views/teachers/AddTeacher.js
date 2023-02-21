import React, { useContext, Fragment, useState } from "react";
import { Breadcrumb } from "@gull";
import { nanoid } from "nanoid";
import { Field, Formik } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { classList } from "@utils";
import CustomMultiSelect from "../SharedComponents/CustomMultiSelect";
import { addTeacher } from "app/reducers/actions/ClassroomActions";
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
const basicFormSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  birthDate: yup.string().required("Birth Date is required"),
  email: yup.string().email().required("Email is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone number is required"),
  subjects: yup.array().required("Subjects is required"),
  gender: yup.string().required("Gender is required"),
});

const AddTeacher = () => {
  const { subjects, user, dispatch, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // Form Initial State
  const initialState = {
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    phone: "",
    subjects: "",
    email: "",
    birthDate: "",
  };
  // generate subjects options for select input
  const options = subjects.map((subject) => {
    return {
      value: subject.id,
      label: subject.subjectName,
    };
  });
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const handleSubmit = async (values) => {
    // destructure values
    const {
      firstName,
      lastName,
      birthDate,
      address,
      phone,
      subjects,
      gender,
      email,
    } = values;
    // get value from subjects object
    const subjectList = [];
    subjects.map((subject) => {
      subjectList.push(subject);
    });
    const teacherName = `${firstName} ${lastName}`;
    // teacher object
    const teacher = {
      teacherName: teacherName,
      address: address,
      email: email,
      phone: phone,
      subjects: subjectList,
      gender: gender,
      birthDate: birthDate,
      created: Date.now(),
    };
    setLoading(true);
    await addTeacher(teacher, token)(dispatch);
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
        history.push("/teachers/teachersList");
      }
    });
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Teachers List", path: "/teachers/teachersList" },
          { name: "Add Teacher" },
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
                        "invalid-field": errors.birthDate && touched.birthDate,
                      })}
                    >
                      <label htmlFor="birthDate" className="ul-form__label">
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
                      <div className="invalid-feedback">
                        Address is required
                      </div>
                    </div>
                  </div>
                  <div className="custom-separator"></div>
                  <div className="form-row">
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
                      <div className="invalid-feedback">
                        Phone number is required
                      </div>
                    </div>
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
                  </div>
                  <div className="custom-separator"></div>
                  <div className="form-row">
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.gender && touched.gender,
                      })}
                    >
                      {" "}
                      <label className="ul-form__label">
                        Gender (<span className="text-danger">*</span>)
                      </label>
                      {genderOptions.map((opt, idx) => (
                        <div key={idx}>
                          <Field
                            className="mr-1"
                            type="radio"
                            name="gender"
                            value={opt.value}
                            // onChange={handleChange}
                            checked={values.gender === opt.value}
                          />
                          <label className="ul-form__label" htmlFor="gender">
                            {opt.label}
                          </label>
                        </div>
                      ))}
                      <div className="invalid-feedback">Gender is required</div>
                    </div>
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.subjects && touched.subjects,
                      })}
                    >
                      <label htmlFor="subjects" className="ul-form__label">
                        Subjects (<span className="text-danger">*</span>)
                      </label>
                      <Field
                        name="subjects"
                        component={CustomMultiSelect}
                        options={options}
                        value={values.subjects}
                        required
                      />
                      <div className="invalid-feedback">
                        Subjects is required
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
                          className="mr-2"
                          variant="info"
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

export default AddTeacher;
