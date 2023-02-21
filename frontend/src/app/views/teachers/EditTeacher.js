import React, { useContext, Fragment, useState } from "react";
import { Breadcrumb } from "@gull";
import { useParams, Link, useHistory } from "react-router-dom";
import { Field, Formik } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import CustomMultiSelect from "../SharedComponents/CustomMultiSelect";
import { updateTeacher } from "app/reducers/actions/ClassroomActions";
import { nanoid } from "nanoid";
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
const basicFormSchema = yup.object().shape({
  teacherName: yup.string().required("Teacher Name is required"),
  birthDate: yup.date().required("Birth Date is required"),
  email: yup.string().email().required("Email is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone number is required"),
  subjects: yup.array().required("Subjects is required"),
  gender: yup.string().required("Gender is required"),
});

const EditTeacher = () => {
  // states from context provider
  const { teachers, user, subjects, dispatch, token } = useContext(AppContext);
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const teacher = teachers.find((teacher) => teacher.id === id);

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
  // save update function
  const handleSave = async (values) => {
    const {
      teacherName,
      birthDate,
      address,
      phone,
      subjects,
      gender,
      email,
      created,
    } = values;
    const subjectList = [];
    subjects.map((subject) => {
      subjectList.push(subject);
    });
    // updated object
    const updatedTeacher = {
      id: id,
      teacherName: teacherName,
      address: address,
      email: email,
      phone: phone,
      subjects: subjectList,
      gender: gender,
      birthDate: birthDate,
      created: created,
      user: user.email,
      modified: Date.now(),
    };
    const notifications = {
      id: nanoid(),
      created: Date.now(),
      user: user.email,
      isViewed: false,
      action: "update",
      content: {
        name: teacherName,
        location: "teacher",

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
          await updateTeacher(
            id,
            updatedTeacher,
            notifications,
            token
          )(dispatch);
          await Swal.fire("Updated!", "Teacher has been updated.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
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
          { name: "Edit Teacher" },
        ]}
      />
      {teacher && (
        <div className="card">
          <div className="card-header">
            <strong>
              Please fill all the required (
              <span className="text-danger">*</span>) fields
            </strong>
          </div>
          <Formik
            initialValues={teacher}
            validationSchema={basicFormSchema}
            onSubmit={handleSave}
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
                          "invalid-field":
                            errors.teacherName && touched.teacherName,
                        })}
                      >
                        <label htmlFor="teacherName" className="ul-form__label">
                          Teacher Name (<span className="text-danger">*</span>)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="teacherName"
                          placeholder="Teacher Name"
                          name="teacherName"
                          value={values.teacherName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <div className="invalid-feedback">
                          {errors.teacherName}
                        </div>
                      </div>
                    </div>
                    <div className="custom-separator"></div>
                    <div className="form-row">
                      <div
                        className={classList({
                          "form-group col-md-6": true,
                          "invalid-field":
                            errors.birthDate && touched.birthDate,
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
                        <div className="invalid-feedback">
                          {errors.birthDate}
                        </div>
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
                        <div className="invalid-feedback">{errors.gender}</div>
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
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      )}
    </Fragment>
  );
};

export default EditTeacher;
