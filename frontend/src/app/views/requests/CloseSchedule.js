import React, { useState, useContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { Formik, Field } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import { Alert, Button, Spinner, Col, Card, Row } from "react-bootstrap";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { addRequest } from "app/reducers/actions/ClassroomActions";
// validation schema
const basicFormSchema = yup.object().shape({
  reason: yup.string().required("Reason is required"),
});
const CloseSchedule = () => {
  const { classroomSlots, dispatch, token, user, classrooms } =
    useContext(AppContext);
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  const classroomSlot = classroomSlots.find((slot) => slot.id === id);
  const [loading, setLoading] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState(false);
  const handleDragOver = (event) => {
    event.preventDefault();
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
  const handleSubmit = async (values, actions) => {
    const { resourceId, startDate, endDate, startTime, endTime, days } =
      classroomSlot;
    let formData = new FormData();
    console.log(values);
    formData.append("id", nanoid());
    formData.append("requestedBy", user.uid);
    formData.append("scheduleId", id);
    formData.append("reason", values.reason);
    formData.append("status", "Pending");
    formData.append("type", "Close");
    formData.append("resourceId", resourceId);
    formData.append("startDate", Number(startDate));
    formData.append("endDate", Number(endDate));
    formData.append("startTime", Number(startTime));
    formData.append("endTime", Number(endTime));
    formData.append("days", days);
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
          { name: "Request Close Schedule" },
        ]}
      />

      <div className="col-md-12">
        {classroomSlots && classroomSlot && classrooms && (
          <div className="card">
            <div className="card-header">
              <strong>
                Please fill all the required (
                <span className="text-danger">*</span>) fields
              </strong>
            </div>

            <Formik
              initialValues={{
                reason: "",
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
              }) => {
                return (
                  <form
                    className="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="card-body">
                      <div className="col-md-12">
                        <Alert variant="warning" className="mb-3">
                          Warning! Once the request is approved this schedule
                          will be removed
                        </Alert>
                      </div>
                      <div className="col-md-12">
                        {error && (
                          <Alert variant="danger">
                            Please upload only JPEG or PNG files.
                          </Alert>
                        )}
                      </div>
                      <div className="col-md-12">
                        <div className="d-flex flex-column mb-2">
                          <span className="text-15 font-weight-bold mb-2">
                            Schedule
                          </span>
                          <span className="mb-2">
                            Room:
                            {classrooms.find(
                              (room) => room.id === classroomSlot.resourceId
                            )
                              ? classrooms.find(
                                  (room) => room.id === classroomSlot.resourceId
                                ).title
                              : "-"}
                          </span>
                          <span className="mb-2">
                            Date:{" "}
                            {`${format(
                              new Date(classroomSlot.startDate),
                              "yyyy/MM/dd"
                            )} - ${format(
                              new Date(classroomSlot.endDate),
                              "yyyy/MM/dd"
                            )}`}
                          </span>
                          <span className="mb-2">
                            Time:{" "}
                            {`${format(
                              new Date(0, 0, 0, classroomSlot.startTime),
                              "h:mm aa"
                            )} - ${format(
                              new Date(0, 0, 0, classroomSlot.endTime),
                              "h:mm aa"
                            )}`}
                          </span>

                          <div className="d-flex flex-row mb-2">
                            <span>
                              Days:
                              {classroomSlot.days.map((day, idx) => (
                                <span key={idx}>{day}, </span>
                              ))}
                            </span>
                          </div>
                        </div>
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
                                <Col
                                  lg={4}
                                  md={4}
                                  sm={12}
                                  xs={12}
                                  className="mb-3"
                                >
                                  {item.name}
                                </Col>
                                <Col
                                  lg={1}
                                  md={1}
                                  sm={12}
                                  xs={12}
                                  className="mb-3"
                                >
                                  {(item.size / 1024 / 1024).toFixed(1)} MB
                                </Col>
                                <Col
                                  lg={2}
                                  md={2}
                                  sm={12}
                                  xs={12}
                                  className="mb-3"
                                ></Col>

                                <Col
                                  lg={4}
                                  md={4}
                                  sm={12}
                                  xs={12}
                                  className="mb-3"
                                >
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
                    </div>
                    <div className="card-footer">
                      <div className="mc-footer">
                        <Button
                          disabled={loading}
                          className=" text-12 btn btn-primary mr-2"
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
                  </form>
                );
              }}
            </Formik>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CloseSchedule;
