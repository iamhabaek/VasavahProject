import React, { useContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import { Field, Formik } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "./CustomSelect";
import CustomMultiSelect from "./CustomMultiSelect";
import api from "app/api/api";
import { genderOptions } from "../students/options";
import Swal from "sweetalert2";
import { NotificationManager } from "react-notifications";
import { updateTeacher } from "app/reducers/actions/ClassroomActions";
const basicFormSchema = yup.object().shape({
  teacherName: yup.string().required("Teacher Name is required"),
  age: yup.number().required("Age is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone number is required"),
  subjects: yup.string().required("Subjects is required"),
  gender: yup.string().required("Subjects is required"),
});

const EditTeacher = () => {
  const history = useHistory();
  // states from context provider
  const { teachers, subjects, dispatch } = useContext(AppContext);

  const { id } = useParams();

  const teacher = teachers.find((teacher) => teacher.id === id);

  const options = subjects.map((subject) => {
    return {
      value: subject.subjectName,
      label: subject.subjectName,
    };
  });
  // save update function
  const handleSave = async (values) => {
    const { teacherName, age, address, gender, phone, subjects, id } = values;
    const newSubject = [];
    subjects.map((subject) => {
      newSubject.push(subject.value);
    });
    // updated object
    const updatedTeacher = {
      id: id,
      teacherName: teacherName,
      age: age,
      address: address,
      phone: phone,
      subjects: newSubject,
      gender: gender,
    };
    updateTeacher(id, updatedTeacher)(dispatch);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/teachers/teachersList");
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
                          Teacher Name:
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
                          Teacher name is required
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
                          "invalid-field": errors.subjects && touched.subjects,
                        })}
                      >
                        <label htmlFor="subject" className="ul-form__label">
                          Subject:
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
                          <button type="submit" className="btn btn-primary m-1">
                            Submit
                          </button>
                          <button
                            onClick={handleCancel}
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
      )}
    </Fragment>
  );
};

export default EditTeacher;
