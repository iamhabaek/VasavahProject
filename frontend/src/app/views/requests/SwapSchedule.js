import React, { useContext, Fragment, useState } from "react";
import { Breadcrumb } from "@gull";
import { Link, useHistory, useParams } from "react-router-dom";
import { Formik } from "formik";
import AppContext from "app/appContext";
import api from "app/api/api";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "./CustomSelect";
import { Button, Spinner, Col, Card, Row, Alert } from "react-bootstrap";
import { addRequest } from "app/reducers/actions/ClassroomActions";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import { format } from "date-fns";
const basicFormSchema = yup.object().shape({
  schedule: yup.string().required("Schedule is required"),
  reason: yup.string().required("Reason is required"),
});
const SwapSchedule = () => {
  const {
    classrooms,
    classroomSlots,
    user,
    teachers,
    subjects,
    dispatch,
    token,
  } = useContext(AppContext);
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false);
  const classroomSlot = classroomSlots.find(
    (classroomSlot) => classroomSlot.id === id
  );
  const history = useHistory();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const validate = (values) => {
    const { schedule } = values;

    const scheduleFilter = classroomSlots.filter(
      (slot) =>
        slot.startDate <= schedule.endDate &&
        slot.endDate >= schedule.startDate &&
        slot.teacher === classroomSlot.teacher &&
        schedule.days.some((day) => slot.days.includes(day))
    );
    let roomConflicts = [];
    scheduleFilter.forEach((sched) => {
      if (
        sched.startTime < schedule.endTime &&
        sched.endTime > schedule.startTime
      ) {
        roomConflicts.push({
          room:
            classrooms &&
            classrooms.find((room) => room.id === sched.resourceId) &&
            classrooms.find((room) => room.id === sched.resourceId).title,
          availableDays: classroomSlot.days.filter(
            (day) => !sched.days.includes(day)
          ),
          conflictingDays: classroomSlot.days.filter((day) =>
            sched.days.includes(day)
          ),
          time: { startTime: sched.startTime, endTime: sched.endTime },
        });
      }
    });
    if (roomConflicts.length > 0) {
      return {
        conflictingRooms: roomConflicts
          .sort((a, b) => {
            if (a.time.startTime < b.time.startTime) {
              return -1;
            }
            if (a.time.startTime < b.time.startTime) {
              return 1;
            }
            return 0;
          })
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
                ${conflict.conflictingDays.join(", ")}`}
              </span>
              <span>
                {`Day/s that are not occupied with time schedule: 
                ${conflict.availableDays.join(", ")}`}
              </span>
            </div>
          )),
      };
    }
  };
  const handleFileSelect = (event) => {
    let files = event.target.files;
    if (files && files.length) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!allowedExtensions.exec(file.name)) {
          setError(true);
          setSelectedFiles("");
          return false;
        }
      }
    }
    setError(false);
    setSelectedFiles([...files]);
  };

  const handleSingleRemove = (index) => {
    const files = [...selectedFiles];
    files.splice(index, 1);
    setSelectedFiles([...files]);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.persist();

    let files = event.dataTransfer.files;
    if (files && files.length) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!allowedExtensions.exec(file.name)) {
          setError(true);
          setSelectedFiles("");
          return false;
        }
      }
    }
    setError(false);
    setSelectedFiles([...selectedFiles, ...files]);
  };
  const filteredSlots = classroomSlots.filter(
    (slot) =>
      slot.id !== id &&
      slot.resourceId === classroomSlot.resourceId &&
      slot.startDate <= classroomSlot.endDate &&
      slot.endDate >= classroomSlot.startDate
    // classroomSlot.days.every((day) => slot.days.includes(day))
  );

  const options = filteredSlots.map((slot) => {
    return {
      value: slot,
      label: `${
        classrooms.find((classroom) => classroom.id === slot.resourceId)
          ? classrooms.find((classroom) => classroom.id === slot.resourceId)
              .title
          : "-"
      } ${format(new Date(slot.startDate), "yyyy/MM/dd")} - ${format(
        new Date(slot.endDate),
        "yyyy/MM/dd"
      )} ${format(new Date(0, 0, 0, slot.startTime), "h:mm aa")} - ${format(
        new Date(0, 0, 0, slot.endTime),
        "h:mm aa"
      )} ${
        teachers.find((teacher) => teacher.id === slot.teacher)
          ? teachers.find((teacher) => teacher.id === slot.teacher).teacherName
          : "-"
      } ${slot.days.map((day) => day)}`,
    };
  });
  for (const key of Object.keys(selectedFiles)) {
    console.log(selectedFiles[key]);
  }
  const handleSubmit = async (values) => {
    let formData = new FormData();
    console.log(values);
    formData.append("id", nanoid());
    formData.append("requestedBy", user.uid);
    formData.append("scheduleId", id);
    formData.append("scheduleToSwap", values.schedule.id);
    formData.append("reason", values.reason);
    formData.append("status", "Pending");
    formData.append("type", "Swap");
    formData.append("created", Date.now());
    for (const key of Object.keys(selectedFiles)) {
      formData.append("attachments", selectedFiles[key]);
    }
    setLoading(true);
    await addRequest(formData, token)(dispatch);
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
        history.push("/classrooms/my-classes/");
      }
    });
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Request Swap Schedule" },
        ]}
      />
      <div className="card">
        <Formik
          initialValues={{
            schedule: "",
            attachment: [],
            reason: "",
          }}
          validationSchema={basicFormSchema}
          onSubmit={handleSubmit}
          validate={validate}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            setFieldValue,
          }) => {
            return (
              <form
                className="needs-validation"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="card-body">
                  <div className="col-md-12">
                    {error && (
                      <Alert variant="danger">
                        Please upload only JPEG or PNG files.
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
                  </div>
                  <div
                    className={classList({
                      "form-group col-md-6": true,
                      "invalid-field": errors.schedule && touched.schedule,
                    })}
                  >
                    <label htmlFor="schedule" className="ul-form__label">
                      Schedule:
                    </label>
                    <CustomSelect
                      name="schedule"
                      options={options}
                      onChange={(value) =>
                        setFieldValue("schedule", value.value)
                      }
                      value={values.schedule}
                      required
                    />
                    <div className="invalid-feedback">Schedule is required</div>
                  </div>
                  <div
                    className={classList({
                      "col-md-6 mb-3": true,
                      "valid-field": !errors.reason && touched.reason,
                      "invalid-field": errors.reason && touched.reason,
                    })}
                  >
                    <label htmlFor="reason">
                      Reason <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      className="form-control"
                      rows={3}
                      onChange={handleChange}
                      value={values.reason}
                      required
                    />
                    <div className="invalid-feedback">{errors.reason}</div>
                  </div>
                  <div
                    className={classList({
                      "form-group col-md-6": true,
                      "invalid-field": errors.teacher && touched.teacher,
                    })}
                  >
                    <label htmlFor="attachment">Attachment</label>
                    <div>
                      <label htmlFor="upload-single-file">
                        <Button
                          className="btn-rounded btn-sm btn-info mt-2"
                          as="span"
                        >
                          <div className="flex flex-middle">
                            <i className="i-Share-on-Cloud"> </i>
                            <span className="text-8">Choose Files</span>
                          </div>
                        </Button>
                      </label>
                      <input
                        className="d-none"
                        onChange={handleFileSelect}
                        accept="image/*"
                        id="upload-single-file"
                        type="file"
                        multiple
                      />
                    </div>
                  </div>
                  <div
                    className={classList({
                      "col-md-6 mb-3": true,
                    })}
                  >
                    <div
                      className={`dropzone mb-4 d-flex justify-content-center align-items-center`}
                      // onDragEnter={this.handleDragStart}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {selectedFiles.length === 0 ? (
                        <span>Drop your files here</span>
                      ) : (
                        <h5 className="m-0">
                          {selectedFiles.length} file
                          {selectedFiles.length > 1 ? "s" : ""} selected...
                        </h5>
                      )}
                    </div>
                  </div>
                  {selectedFiles.length !== 0 && (
                    <Card className="mb-4">
                      <Row className="align-items-center p-3">
                        <Col lg={4} md={4}>
                          Name
                        </Col>
                        <Col lg={1} md={1}>
                          Size
                        </Col>
                      </Row>
                      <hr className="mt-0 mb-3" />

                      {selectedFiles.map((item, index) => {
                        return (
                          <Row
                            className="align-items-center px-3"
                            key={item.name}
                          >
                            <Col lg={4} md={4} sm={12} xs={12} className="mb-3">
                              {item.name}
                            </Col>
                            <Col lg={1} md={1} sm={12} xs={12} className="mb-3">
                              {(item.size / 1024 / 1024).toFixed(1)} MB
                            </Col>
                            <Col
                              lg={2}
                              md={2}
                              sm={12}
                              xs={12}
                              className="mb-3"
                            ></Col>

                            <Col lg={4} md={4} sm={12} xs={12} className="mb-3">
                              <div className="d-flex">
                                <Button
                                  variant="danger"
                                  onClick={() => handleSingleRemove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        );
                      })}
                    </Card>
                  )}
                  <div className="custom-separator"></div>
                </div>
                <div className="card-footer">
                  <div className="mc-footer">
                    <div className="row">
                      <div className="col-lg-12 ">
                        <Button
                          disabled={loading || errors.conflictingRooms}
                          className="btn btn-primary m-1"
                          type="submit"
                        >
                          {loading && (
                            <Spinner
                              size="sm"
                              variant="light"
                              className="mr-1"
                              animation="border"
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

export default SwapSchedule;
