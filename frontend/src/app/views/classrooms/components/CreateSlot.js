import React, { useState, Fragment } from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { classList } from "@utils";
import { nanoid } from "nanoid";
import ReactDatePicker from "react-datepicker";
import NotificationManager from "react-notifications/lib/NotificationManager";
import api from "app/api/api";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Spinner, Modal, Alert } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import dayjs from "dayjs";
import MultiSelect from "../../SharedComponents/MultiSelect";
import {
  filterStartTime,
  filterEndTime,
} from "../functions/filterTimeSlotOptions";
import ScheduleSuggestionModal from "./ScheduleSuggestionModal";
import { format } from "date-fns";
const basicFormSchema = yup.object().shape({
  resourceId: yup.string().required("Please select a room"),
  startDate: yup.string().required("Please select a start date "),
  endDate: yup.string().required("Please select an end date "),
  startTime: yup.string().required("Please select a start time"),
  subject: yup.string().required("Please select a subject "),
  endTime: yup.string().required("Please select an end time"),
  course: yup.string().required("Please select a course "),
  yearLevel: yup.string().required("Please select year level "),
  days: yup.array().required("Please select days"),
});

const CreateSlot = ({
  handleClose,
  token,
  dispatch,
  show,
  teachers,
  classrooms,
  courses,
  user,
  handleShowCreateSlot,
  classroomSlots,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const initialState = {
    resourceId: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    subject: "",
    course: "",
    yearLevel: "",
    days: "",
  };
  const history = useHistory();
  const teacher = teachers.find((teacher) => teacher.id === user.uid);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const validate = (values) => {
    const { startDate, endDate, endTime, startTime, resourceId, days } = values;
    let start = dayjs(startDate);
    let end = dayjs(endDate);
    const startD = new Date(startDate);
    const endD = new Date(endDate);
    let daysOfWeek = [];
    for (
      let currentDate = start;
      currentDate <= end;
      currentDate = dayjs(currentDate).add(1, "day")
    ) {
      let dayOfWeek = dayjs(currentDate).format("dddd");
      daysOfWeek.push(dayOfWeek);
    }
    // check if the selected days corresponds to the selected dates
    let conflict =
      startD &&
      endD &&
      days.length > 0 &&
      days.every((value) => daysOfWeek.includes(value.label));
    let daysData = [];
    days && days.map((day) => daysData.push(day.label));
    // check if selected endTime is before selected StartTime
    if (startTime.value && endTime.value && endTime.value < startTime.value) {
      return {
        timeCombination: `Your chosen end time cannot be before your chosen start time`,
      };
    }
    // check if selected endTime is before selected StartTime

    if (startTime.value && endTime.value && endTime.value === startTime.value) {
      return {
        timeCombination:
          "Your chosen start time cannot be the same with your chosen end time",
      };
    }
    // Check if   selected endDate is before selected startDate
    if (
      startDate &&
      endDate &&
      new Date(endDate).getTime() < new Date(startDate).getTime()
    ) {
      return {
        dateCombination:
          "Your chosen end date cannot be before your chosen start date",
      };
    }
    if (
      startDate &&
      endDate &&
      new Date(endDate).getTime() === new Date(startDate).getTime()
    ) {
      return {
        dateCombination:
          "Your chosen start date cannot be the same your chosen end date",
      };
    }
    // Check if  corresponding days is within the selected Dates

    if (startDate && endDate && days && !conflict) {
      return {
        daysCombination: `Your chosen days should correspond to the chosen start and end date`,
      };
    }
    // Filter the schedule if there is conflict with other rooms
    const roomConflictFilter = classroomSlots.filter(
      (slot) =>
        slot.startDate <= new Date(endDate).getTime() &&
        slot.endDate >= new Date(startDate).getTime() &&
        slot.teacher === teacher.id &&
        slot.days.some((day) => daysData.includes(day))
    );
    const classroomFilter = classroomSlots.filter(
      (slot) => slot.resourceId === resourceId.value
    );
    const scheduleConflictFilter = classroomFilter.filter(
      (slot) =>
        slot.startDate <= new Date(endDate).getTime() &&
        slot.endDate >= new Date(startDate).getTime() &&
        slot.days.some((day) => daysData.includes(day))
    );
    let conflicts = [];
    let roomConflicts = [];
    scheduleConflictFilter.forEach((s) => {
      if (s.startTime < endTime.value && s.endTime > startTime.value) {
        conflicts.push({
          availableDays: daysData.filter((day) => !s.days.includes(day)),
          conflictingDays: daysData.filter((day) => s.days.includes(day)),
          time: { startTime: s.startTime, endTime: s.endTime },
        });
      }
    });
    roomConflictFilter.forEach((sched) => {
      if (sched.startTime < endTime.value && sched.endTime > startTime.value) {
        roomConflicts.push({
          room:
            classrooms &&
            classrooms.find((room) => room.id === sched.resourceId) &&
            classrooms.find((room) => room.id === sched.resourceId).title,
          availableDays: daysData.filter((day) => !sched.days.includes(day)),
          conflictingDays: daysData.filter((day) => sched.days.includes(day)),
          time: { startTime: sched.startTime, endTime: sched.endTime },
        });
      }
    });
    // Show validation message if there is conflicts
    if (conflicts.length > 0) {
      return {
        conflictingDays: conflicts
          .sort((a, b) => a.time.startTime - b.time.startTime)
          .map((conflict, idx) => (
            <div key={idx} className="d-flex flex-column mt-2">
              <span>
                {`Conflicted Time schedule:
                ${format(new Date(0, 0, 0, conflict.time.startTime), "h:mm aa")}
                - ${format(new Date(0, 0, 0, conflict.time.endTime), "h:mm aa")}
                `}
              </span>
              <span>
                {`Day/s occupied with the time schedule: 
                ${
                  conflict.conflictingDays.length !== 0
                    ? conflict.conflictingDays.join(", ")
                    : "None"
                }`}
              </span>
              <span>
                {`Day/s that are not occupied with time schedule: 
                ${
                  conflict.availableDays.length !== 0
                    ? conflict.availableDays.join(", ")
                    : "None"
                }`}
              </span>
            </div>
          )),
      };
    }
    // Show validation message if there is conflicts

    if (roomConflicts.length > 0) {
      return {
        conflictingRooms: roomConflicts
          .sort((a, b) => a.time.startTime - b.time.startTime)
          .map((conflict, idx) => (
            <div key={idx} className="d-flex flex-column mt-2">
              <span>
                {`Conflicted Room:
                  ${conflict.room}
                `}
              </span>
              <span>
                {`Conflicted Time schedule:
                ${format(new Date(0, 0, 0, conflict.time.startTime), "h:mm aa")}
                - ${format(new Date(0, 0, 0, conflict.time.endTime), "h:mm aa")}
                `}
              </span>
              <span>
                {`Day/s occupied with the time schedule: 
               ${
                 conflict.conflictingDays.length !== 0
                   ? conflict.conflictingDays.join(", ")
                   : "None"
               }`}
              </span>
              <span>
                {`Day/s that are not occupied with time schedule: 
                ${
                  conflict.availableDays.length !== 0
                    ? conflict.availableDays.join(", ")
                    : "None"
                }`}
              </span>
            </div>
          )),
      };
    }
    return {};
  };
  const handleSubmit = async (values) => {
    const {
      startDate,
      endDate,
      endTime,
      startTime,
      resourceId,
      course,
      subject,
      yearLevel,
      days,
    } = values;

    const daysList = [];
    days.map((day) => daysList.push(day.label));
    const classroomSLot = {
      id: nanoid(),
      resourceId: resourceId.value,
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
      startTime: startTime.value,
      endTime: endTime.value,
      subject: subject,
      teacher: user.uid,
      yearLevel: yearLevel,
      course: course,
      isApproved: false,
      days: daysList,
      studentsId: [],
      created: Date.now(),
    };
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.post("/classroomSlots/", classroomSLot, config);
      handleShowCreateSlot();
      NotificationManager.success("Schedule Applied Successfully");
      history.push("/classrooms/schedule");
    } catch (error) {
      Swal.fire(`${error.response.data.message}`, "error");
    }

    setLoading(false);
  };
  const classroomOptions = classrooms.map((room) => {
    return {
      label: room.title,
      value: room.id,
    };
  });
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

  const daysOptions = days.map((day, idx) => {
    return {
      label: day,
      value: idx,
    };
  });
  const courseOptions =
    courses &&
    courses.map((course) => {
      return {
        value: course.courseName,
        label: course.courseName,
      };
    });
  const subjectsOption =
    teacher &&
    teacher.subjects.map((subject) => {
      return {
        value: subject.value,
        label: subject.label,
      };
    });
  const yearLevelOptions = years.map((year) => {
    return {
      value: year,
      label: year,
    };
  });
  return (
    <Fragment>
      {teacher && (
        <Modal show={show} size="lg" onHide={handleShowCreateSlot} {...props}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="i-Pen-2"></i> Apply Schedule
            </Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={initialState}
            validationSchema={basicFormSchema}
            onSubmit={handleSubmit}
            validate={validate}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              isSubmitting,
              handleChange,
              setFieldValue,
            }) => {
              return (
                <form
                  className="needs-validation"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <Modal.Body>
                    {teacher && (
                      <div className="card-body">
                        <span>
                          Please fill all the required (
                          <span className="text-danger">*</span>) fields
                        </span>
                        {errors.conflictingDays && (
                          <Alert variant="danger">
                            <span>
                              Conflicts on your selected time schedule *{" "}
                              {<span>{errors.conflictingDays}</span>}
                            </span>
                          </Alert>
                        )}
                        {errors.timeCombination && (
                          <Alert variant="danger">
                            {errors.timeCombination}
                          </Alert>
                        )}
                        {errors.conflictingRooms && (
                          <Alert variant="danger">
                            <span>
                              You already have the same schedule in other room/s{" "}
                              {<span>{errors.conflictingRooms}</span>}
                            </span>
                          </Alert>
                        )}
                        {errors.dateCombination && (
                          <Alert variant="danger">
                            {errors.dateCombination}
                          </Alert>
                        )}
                        {errors.daysCombination && (
                          <Alert variant="danger">
                            {errors.daysCombination}
                          </Alert>
                        )}
                        <div className="form-row">
                          <div
                            className={classList({
                              "form-group col-md-6": true,
                              "invalid-field":
                                errors.resourceId && touched.resourceId,
                            })}
                          >
                            <label
                              htmlFor="resourceId"
                              className="ul-form__label"
                            >
                              Room <span className="text-danger">*</span>
                            </label>
                            <Field name="resourceId">
                              {({ field, form }) => (
                                <Select
                                  options={classroomOptions}
                                  value={classroomOptions.find(
                                    (o) => o.value === values.resourceId
                                  )}
                                  onChange={(selectedOption) => {
                                    form.setFieldValue(
                                      "resourceId",
                                      selectedOption
                                    );
                                    form.setFieldValue("startTime", "");
                                    form.setFieldValue("endTime", "");
                                  }}
                                />
                              )}
                            </Field>
                            <div className="invalid-feedback">
                              {errors.resourceId}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "form-group col-md-6": true,
                              "invalid-field": errors.days && touched.days,
                            })}
                          >
                            <label htmlFor="days" className="ul-form__label">
                              Days <span className="text-danger">*</span>
                            </label>
                            <MultiSelect
                              name="days"
                              options={daysOptions}
                              isMulti
                              value={values.days}
                            />

                            <div className="invalid-feedback">
                              Days is required
                            </div>
                          </div>
                          <div
                            className={classList({
                              "form-group col-md-6": true,
                              "invalid-field":
                                errors.startDate && touched.startDate,
                            })}
                          >
                            <label
                              htmlFor="startDate"
                              className="ul-form__label mr-2"
                            >
                              Start Date <span className="text-danger">*</span>
                            </label>
                            <div className="customDatePickerWidth">
                              <Field name="startDate">
                                {({ field, form }) => (
                                  <ReactDatePicker
                                    dateFormat="yyyy/MM/dd"
                                    className="form-control "
                                    placeholderText="Select Date"
                                    selected={values.startDate}
                                    onChange={(date) => {
                                      form.setFieldValue("startDate", date);
                                      // form.setFieldValue("endDate", "");
                                    }}
                                  />
                                )}
                              </Field>
                            </div>
                            <div className="invalid-feedback">
                              {errors.startDate}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "form-group col-md-6": true,
                              "invalid-field":
                                errors.endTime && touched.endTime,
                            })}
                          >
                            <label
                              htmlFor="endDate"
                              className="ul-form__label mr-2"
                            >
                              End Date <span className="text-danger">*</span>
                            </label>
                            <div className="customDatePickerWidth">
                              <Field name="endDate">
                                {({ field, form }) => (
                                  <ReactDatePicker
                                    className="form-control"
                                    dateFormat="yyyy/MM/dd"
                                    placeholderText="Select Date"
                                    selected={values.endDate}
                                    onChange={(date) => {
                                      form.setFieldValue("endDate", date);
                                    }}
                                  />
                                )}
                              </Field>
                            </div>
                            <div className="invalid-feedback">
                              {errors.endDate}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "form-group col-md-6": true,
                              "invalid-field":
                                errors.startTime && touched.startTime,
                            })}
                          >
                            <label
                              htmlFor="startTime"
                              className="ul-form__label"
                            >
                              Start Time <span className="text-danger">*</span>
                            </label>
                            <Field name="startTime">
                              {({ field, form }) => (
                                <Select
                                  isDisabled={
                                    !values.startDate ||
                                    !values.endDate ||
                                    !values.days ||
                                    !values.resourceId
                                  }
                                  options={filterStartTime(
                                    values.resourceId,
                                    values.startDate,
                                    values.endDate,
                                    values.days,
                                    classroomSlots,
                                    7,
                                    20
                                  )}
                                  value={values.startTime}
                                  onChange={(selectedOption) => {
                                    form.setFieldValue(
                                      "startTime",
                                      selectedOption
                                    );
                                  }}
                                />
                              )}
                            </Field>
                            <div className="invalid-feedback">
                              Start Time is required
                            </div>
                          </div>
                          <div
                            className={classList({
                              "form-group col-md-6": true,
                              "invalid-field":
                                errors.endTime && touched.endTime,
                            })}
                          >
                            <label htmlFor="endTime" className="ul-form__label">
                              End Time
                            </label>
                            <Field name="endTime">
                              {({ field, form }) => (
                                <Select
                                  isDisabled={
                                    !values.startDate ||
                                    !values.endDate ||
                                    !values.days ||
                                    !values.resourceId
                                  }
                                  options={filterEndTime(
                                    values.resourceId,
                                    values.startDate,
                                    values.endDate,
                                    values.days,
                                    classroomSlots,
                                    8,
                                    21
                                  )}
                                  // value={timeOptions.find(
                                  //   (o) => o.value === values.endTime
                                  // )}
                                  value={values.endTime}
                                  onChange={(selectedOption) => {
                                    form.setFieldValue(
                                      "endTime",
                                      selectedOption
                                    );
                                  }}
                                />
                              )}
                            </Field>
                            <div className="invalid-feedback">
                              End Time is required
                            </div>
                          </div>
                          <div
                            className={classList({
                              "form-group col-md-6": true,
                              "invalid-field":
                                errors.subject && touched.subject,
                            })}
                          >
                            <label htmlFor="subject" className="ul-form__label">
                              Subject <span className="text-danger">*</span>
                            </label>
                            <Field name="subject">
                              {({ field, form }) => (
                                <Select
                                  options={subjectsOption}
                                  value={subjectsOption.find(
                                    (o) => o.value === values.subject
                                  )}
                                  onChange={(selectedOption) => {
                                    form.setFieldValue(
                                      "subject",
                                      selectedOption
                                    );
                                  }}
                                />
                              )}
                            </Field>
                            <div className="invalid-feedback">
                              Subject is required
                            </div>
                          </div>

                          <div
                            className={classList({
                              "form-group col-md-6": true,
                              "invalid-field": errors.course && touched.course,
                            })}
                          >
                            <label htmlFor="course" className="ul-form__label">
                              Course <span className="text-danger">*</span>
                            </label>
                            <Field name="course">
                              {({ field, form }) => (
                                <Select
                                  options={courseOptions}
                                  value={courseOptions.find(
                                    (o) => o.value === values.course
                                  )}
                                  onChange={(selectedOption) => {
                                    form.setFieldValue(
                                      "course",
                                      selectedOption
                                    );
                                  }}
                                />
                              )}
                            </Field>
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
                            <label
                              htmlFor="yearLevel"
                              className="ul-form__label"
                            >
                              Year Level <span className="text-danger">*</span>
                            </label>
                            <Field name="yearLevel">
                              {({ field, form }) => (
                                <Select
                                  options={yearLevelOptions}
                                  value={yearLevelOptions.find(
                                    (o) => o.value === values.yearLevel
                                  )}
                                  onChange={(selectedOption) => {
                                    form.setFieldValue(
                                      "yearLevel",
                                      selectedOption
                                    );
                                  }}
                                />
                              )}
                            </Field>
                            <div className="invalid-feedback">
                              Year Level is required
                            </div>
                          </div>
                        </div>
                        <div className="custom-separator"></div>
                      </div>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleShowCreateSlot}>
                      Cancel
                    </Button>
                    <Button
                      disabled={
                        loading ||
                        errors.conflictingDays ||
                        errors.timeCombination ||
                        errors.dateCombination ||
                        errors.conflictingRooms
                      }
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
                  </Modal.Footer>
                </form>
              );
            }}
          </Formik>
          <ScheduleSuggestionModal
            show={showModal}
            handleClose={handleCloseModal}
            available={slots}
            token={token}
            dispatch={dispatch}
            handleShowCreateSlot={handleShowCreateSlot}
          />
        </Modal>
      )}
    </Fragment>
  );
};

export default CreateSlot;
