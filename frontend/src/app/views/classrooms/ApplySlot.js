import React, { useContext, useState, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Field } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "./CustomSelect";
import { nanoid } from "nanoid";
import { Spinner, Button } from "react-bootstrap";
import CustomMultiSelect from "./CustomMultiSelect";
import { Link } from "react-router-dom";
import { applySlot } from "app/reducers/actions/ClassroomActions";
const basicFormSchema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  startTime: yup.string().required("Start Time is required"),
  endTime: yup.string().required("Eend Time is required"),
  course: yup.string().required("Course is required"),
  yearLevel: yup.string().required("Year Level is required"),
  teacher: yup.string().required("Teacher is required"),
  days: yup.array().required("Days is required"),
});

const ApplySlot = () => {
  const { teachers, subjects, classrooms, courses, dispatch } =
    useContext(AppContext);
  const history = useHistory();
  const [loading, setLoading] = useState();
  const initialState = {
    startTime: "",
    endTime: "",
    teacher: "",
    subject: "",
    course: "",
    yearLevel: "",
    days: "",
  };
  // Options
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const { id } = useParams();
  const classroom = classrooms.find((classroom) => classroom.id === id);

  const courseOptions =
    courses &&
    courses.map((course) => {
      return {
        value: course.courseName,
        label: course.courseName,
      };
    });
  const teachersOptions = teachers.map((teacher) => {
    return {
      value: teacher.teacherName,
      label: teacher.teacherName,
    };
  });
  const subjectsOption = subjects.map((subject) => {
    return {
      value: subject.subjectName,
      label: subject.subjectName,
    };
  });
  const yearLevelOptions = years.map((year) => {
    return {
      value: year,
      label: year,
    };
  });
  const daysOptions = days.map((day) => {
    return {
      value: day,
      label: day,
    };
  });
  const startTimeOptions =
    classroom &&
    classroom.timeSlots.map((slot) => {
      return {
        value: slot.start,
        label: slot.start,
      };
    });
  const endTimeOptions =
    classroom &&
    classroom.timeSlots.map((slot) => {
      return {
        value: slot.end,
        label: slot.end,
      };
    });

  const handleSubmit = async (values) => {
    const { startTime, endTime, subject, teacher, course, yearLevel, days } =
      values;

    const findStartIdx = classroom.timeSlots.findIndex(
      (block) => block.start === startTime
    );
    const findEndIdx = classroom.timeSlots.findIndex(
      (block) => block.end === endTime
    );
    console.log(values);
    const newTimeSlots = [...classroom.timeSlots];
    newTimeSlots.splice(findStartIdx, findEndIdx - findStartIdx + 1);
    console.log(newTimeSlots);
    const updatedClassroom = {
      id: nanoid(),
      classroomId: id,
      startTime: startTime,
      endTime: endTime,
      subject: subject,
      teacher: teacher,
      yearLevel: yearLevel,
      course: course,
      days: days,
    };
    const updatedTimeSlots = {
      timeSlots: newTimeSlots,
    };
    setLoading(true);
    // Action for applying slot using reducer
    applySlot(id, updatedClassroom, updatedTimeSlots, newTimeSlots)(dispatch);
    setLoading(false);
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Classrooms List", path: "/classrooms/classrooms-list" },
          { name: "Apply for slot" },
        ]}
      />
      {classroom && (
        <div className="card">
          <h1 className="m-3">{classroom.roomName}</h1>

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
                          "invalid-field": errors.teacher && touched.teacher,
                        })}
                      >
                        <label htmlFor="firstName" className="ul-form__label">
                          Teacher Name:
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
                          Teacher name is required
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
                      <div
                        className={classList({
                          "form-group col-md-6": true,
                          "invalid-field":
                            errors.startTime && touched.startTime,
                        })}
                      >
                        <label htmlFor="startTime" className="ul-form__label">
                          Start Time
                        </label>
                        <CustomSelect
                          name="startTime"
                          options={startTimeOptions}
                          onChange={(value) =>
                            setFieldValue("startTime", value.value)
                          }
                          value={values.startTime}
                          required
                        />
                        <div className="invalid-feedback">
                          Start Time is required
                        </div>
                      </div>
                      <div
                        className={classList({
                          "form-group col-md-6": true,
                          "invalid-field": errors.endTime && touched.endTime,
                        })}
                      >
                        <label htmlFor="endTime" className="ul-form__label">
                          End Time
                        </label>
                        <CustomSelect
                          name="startTime"
                          options={endTimeOptions}
                          onChange={(value) =>
                            setFieldValue("endTime", value.value)
                          }
                          value={values.endTime}
                          required
                        />
                        <div className="invalid-feedback">
                          End Time is required
                        </div>
                      </div>
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
                      <div
                        className={classList({
                          "form-group col-md-6": true,
                          "invalid-field": errors.day && touched.day,
                        })}
                      >
                        <label htmlFor="days" className="ul-form__label">
                          Days
                        </label>
                        <Field
                          name="days"
                          component={CustomMultiSelect}
                          options={daysOptions}
                          value={values.days}
                          required
                        />
                        <div className="invalid-feedback">Days is required</div>
                      </div>
                    </div>
                    <div className="custom-separator"></div>
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
                          <Link to="/classrooms/classrooms-list">
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
      )}
    </Fragment>
  );
};

export default ApplySlot;
