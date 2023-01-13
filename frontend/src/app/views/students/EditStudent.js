import React, { useContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "./CustomSelect";
import { Formik } from "formik";
import { genderOptions, yearLvlOptions } from "./options";
import Swal from "sweetalert2";
// create axios function
import api from "app/api/api";
import { NotificationManager } from "react-notifications";
import { updateStudent } from "app/reducers/actions/ClassroomActions";
// form validation schema
const basicFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),

  age: yup.number().required("Age is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone number is required"),
  course: yup.string().required("Course is required"),
  yearLevel: yup.string().required("Year Level is required"),
  gender: yup.string().required("Gender is required"),
});

const EditStudent = () => {
  const history = useHistory();

  const { students, courses, dispatch } = useContext(AppContext);

  const { id } = useParams();

  const student = students.find((student) => student.id === id);

  const options = courses.map((course) => {
    return {
      value: course.courseName,
      label: course.courseName,
    };
  });

  const handleSave = async (values) => {
    const { name, age, address, course, yearLevel, gender, phone } = values;
    const updatedStudent = {
      id: id,
      name: name,
      age: age,
      address: address,
      course: course,
      yearLevel: yearLevel,
      phone: phone,
      gender: gender,
    };

    updateStudent(id, updatedStudent)(dispatch);
  };
  const handleCancel = () => {
    history.push("/students/studentsList");
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Students List", path: "/students/studentsList" },
          { name: "Edit Student" },
        ]}
      />
      {student && (
        <div className="card">
          <Formik
            initialValues={student}
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
                            errors.firstName && touched.firstName,
                        })}
                      >
                        <label htmlFor="name" className="ul-form__label">
                          Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="First Name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <div className="invalid-feedback">Name is required</div>
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
                        <div className="invalid-feedback">
                          Gender is required
                        </div>
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
                        <div className="invalid-feedback">
                          Course is required
                        </div>
                      </div>
                      <div
                        className={classList({
                          "form-group col-md-6": true,
                          "invalid-field":
                            errors.yearLevel && touched.yearLevel,
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
                          <button type="submit" className="btn btn-primary m-1">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary m-1"
                            onClick={handleCancel}
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
      )}
    </Fragment>
  );
};

export default EditStudent;
