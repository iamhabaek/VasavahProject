import React, { useState, useContext, createContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { nanoid } from "nanoid";
import { Formik } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "../classrooms/CustomSelect";
import { generateTimeSlots } from "./functions/generateTimeSlots";
import { generateTime } from "./functions/generateTime";
import api from "app/api/api";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addClassroom } from "app/reducers/actions/ClassroomActions";

const basicFormSchema = yup.object().shape({
  roomName: yup.string().required("Room Name is required"),
  startTime: yup.string().required("Start Time is required"),
  endTime: yup.string().required("End Time is required"),
});
const AddClassroom = () => {
  const { classrooms, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const timeSlotOptions = generateTime(6, 21).map((slot) => {
    return {
      value: slot.value,
      label: slot.time,
    };
  });
  const handleSubmit = async (values) => {
    const { roomName, startTime, endTime } = values;
    const timeSlots = generateTimeSlots(startTime, endTime);
    const classroom = {
      id: nanoid(),
      roomName: roomName,
      timeSlots: timeSlots,
    };
    setLoading(true);
    addClassroom(classroom)(dispatch);
    setLoading(false);
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Add Classroom" }]}
      />
      {classrooms && (
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <Formik
                initialValues={{
                  roomName: "",
                  startTime: "",
                  endTime: "",
                }}
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
                      <div className="form-row">
                        <div
                          className={classList({
                            "col-md-4 mb-3": true,
                            "valid-field": !errors.roomName && touched.roomName,
                            "invalid-field":
                              errors.roomName && touched.roomName,
                          })}
                        >
                          <label htmlFor="courseName">Room Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="roomName"
                            placeholder="Room Name"
                            name="roomName"
                            value={values.roomName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                          <div className="invalid-feedback">
                            {errors.roomName}
                          </div>
                        </div>
                      </div>
                      <div className="custom-separator"></div>
                      <div className="form-row">
                        <div
                          className={classList({
                            "col-md-4 mb-3": true,
                            "valid-field":
                              !errors.startTime && touched.startTime,
                            "invalid-field":
                              errors.startTime && touched.startTime,
                          })}
                        >
                          <label htmlFor="startTime">Start Time</label>
                          <CustomSelect
                            name="startTime"
                            options={timeSlotOptions}
                            onChange={(value) =>
                              setFieldValue("startTime", value.value)
                            }
                            value={values.startTime}
                            required
                          />
                          <div className="invalid-feedback">
                            {errors.startTime}
                          </div>
                        </div>
                        <div
                          className={classList({
                            "col-md-4 mb-3": true,
                            "valid-field": !errors.endTime && touched.endTime,
                            "invalid-field": errors.endTime && touched.endTime,
                          })}
                        >
                          <label htmlFor="endTime">End Time</label>
                          <CustomSelect
                            name="endTime"
                            options={timeSlotOptions}
                            onChange={(value) =>
                              setFieldValue("endTime", value.value)
                            }
                            value={values.endTime}
                            required
                          />
                          <div className="invalid-feedback">
                            {errors.endTime}
                          </div>
                        </div>
                      </div>

                      <div className="custom-separator"></div>

                      <Button
                        disabled={loading}
                        className=" text-12 btn btn-primary m-1"
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
                      <Link to="/manage/list">
                        <button
                          type="button"
                          className="btn text-12 btn-outline-secondary m-1"
                        >
                          Cancel
                        </button>
                      </Link>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AddClassroom;
