import React, { useContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "../classrooms/CustomSelect";
import { Formik } from "formik";
import Swal from "sweetalert2";
// create axios function
import api from "app/api/api";
import { NotificationManager } from "react-notifications";

const basicFormSchema = yup.object().shape({
  teacher: yup.string().required("Teacher is required"),
  subject: yup.string().required("Subject is required"),
  course: yup.string().required("Course is required"),
  yearLevel: yup.string().required("Year Level is required"),
});

const EditClassroomSlot = () => {
  const {
    classrooms,
    setClassroomsSlots,
    classroomsSlots,
    teachers,
    subjects,
    courses,
  } = useContext(AppContext);
  const { id } = useParams();
  const history = useHistory();
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];
  const classroomSlot = classroomsSlots.find((slot) => slot.id === id);
  const teacher = teachers.find(
    (teacher) => teacher.id === classroomSlot.teacher
  );
  const subject = subjects.find(
    (subject) => subject.id === classroomSlot.subject
  );
  const course = courses.find((course) => course.id === classroomSlot.course);
  console.log(teacher);
  console.log(subject);
  console.log(course);

  const courseOptions =
    courses &&
    courses.map((course) => {
      return {
        value: course.id,
        label: course.courseName,
      };
    });
  const teachersOptions = teachers.map((teacher) => {
    return {
      value: teacher.id,
      label: teacher.teacherName,
    };
  });
  const subjectsOption = subjects.map((subject) => {
    return {
      value: subject.id,
      label: subject.subjectName,
    };
  });
  const yearLevelOptions = years.map((year) => {
    return {
      value: year,
      label: year,
    };
  });
  const handleSave = async (values) => {
    const { teacher, subject, course, yearLevel } = values;
    const updatedSlot = {
      teacher: teacher,
      subject: subject,
      course: course,
      yearLevel: yearLevel,
    };
    await api.put(`/classroomSlots/${id}`, updatedSlot);
    setClassroomsSlots(
      classroomsSlots.map((classroomSlot) =>
        classroomSlot.id === id
          ? {
              ...classroomSlot,
              teacher: teacher,
              subject: subject,
              course: course,
              yearLevel: yearLevel,
            }
          : classroomSlot
      )
    );
  };
  const handleCancel = () => {
    history.push("/masterClass/list");
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Master Class List", path: "/students/studentsList" },
          { name: "Edit Classroom Slot" },
        ]}
      />
      {classroomSlot && course && subject && teacher ? (
        <div className="card">
          <Formik
            initialValues={{
              teacher: teacher.teacherName,
              subject: subject.subjectName,
              course: course.courseName,
              yearLevel: classroomSlot.yearLevel,
            }}
            validationSchema={basicFormSchema}
            onSubmit={handleSave}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSave,
              isSubmitting,
              setFieldValue,
            }) => {
              return (
                <form
                  className="needs-validation"
                  onSubmit={handleSave}
                  noValidate
                >
                  <div className="card-body">
                    <div className="form-row">
                      <div
                        className={classList({
                          "form-group col-md-6": true,
                          "invalid-field": errors.teacher && touched.teacher,
                        })}
                      >
                        <label htmlFor="teacher" className="ul-form__label">
                          Teacher:
                        </label>
                        <CustomSelect
                          name="teacher"
                          options={teachersOptions}
                          onChange={(value) =>
                            setFieldValue("teacher", value.value)
                          }
                          value={values.teacher}
                          required
                        />
                        <div className="invalid-feedback">
                          Teacher is required
                        </div>
                      </div>
                      <div
                        className={classList({
                          "form-group col-md-6": true,
                          "invalid-field": errors.subject && touched.subject,
                        })}
                      >
                        <label htmlFor="subject" className="ul-form__label">
                          Subject
                        </label>
                        <CustomSelect
                          name="subject"
                          options={subjectsOption}
                          onChange={(value) =>
                            setFieldValue("subject", value.value)
                          }
                          value={values.subject}
                          required
                        />
                        <div className="invalid-feedback">
                          Subject is required
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
                          Course
                        </label>
                        <CustomSelect
                          name="course"
                          options={courseOptions}
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
                          Year Level
                        </label>
                        <CustomSelect
                          name="yearLevel"
                          options={yearLevelOptions}
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
                    <div className="custom-separator"></div>
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
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default EditClassroomSlot;
