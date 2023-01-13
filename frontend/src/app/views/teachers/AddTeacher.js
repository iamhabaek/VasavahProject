import React, { useContext, Fragment, useState } from "react";
import { Breadcrumb } from "@gull";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import { Field, Formik } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "./CustomSelect";
import CustomMultiSelect from "./CustomMultiSelect";
import { genderOptions } from "../students/options";
import api from "app/api/api";
import { NotificationManager } from "react-notifications";
import Swal from "sweetalert2";
import { Button, Spinner } from "react-bootstrap/";
import { useEffect } from "react";
import { addTeacher } from "app/reducers/actions/ClassroomActions";
const basicFormSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  age: yup.number().required("Age is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone number is required"),
  subjects: yup.array().required("Subjects is required"),
  gender: yup.string().required("Gender is required"),
});

const AddTeacher = () => {
  const { isSuccess, isError, message, subjects, dispatch } =
    useContext(AppContext);
  const [loading, setLoading] = useState();
  const history = useHistory();

  console.log(subjects);
  useEffect(() => {
    if (isError) {
      Swal.fire(message, "error");
    }
    if (isSuccess) {
      history.push("/teachers/teachersList");
      NotificationManager.success("Teacher Added", "Success");
    }
  }, [isError, isSuccess, message]);
  const initialState = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    subjects: "",
  };
  // generate subjects options for select input
  const options = subjects.map((subject) => {
    return {
      value: subject.subjectName,
      label: subject.subjectName,
    };
  });

  const handleSubmit = async (values) => {
    // destructure values
    const { firstName, lastName, age, address, phone, subjects, gender } =
      values;
    // get value from subjects object
    const newSubject = [];
    subjects.map((subject) => {
      newSubject.push(subject.value);
    });
    const teacherName = `${firstName} ${lastName}`;
    // teacher object
    const teacher = {
      id: nanoid(),
      teacherName: teacherName,
      age: age,
      address: address,
      phone: phone,
      subjects: newSubject,
      gender: gender,
    };
    setLoading(true);
    addTeacher(teacher)(dispatch);
    setLoading(false);
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
                        "invalid-field": errors.subjects && touched.subjects,
                      })}
                    >
                      <label htmlFor="subjects" className="ul-form__label">
                        Subjects:
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
                        <button
                          type="button"
                          className="btn btn-outline-secondary m-1"
                        >
                          Cancel
                        </button>
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
