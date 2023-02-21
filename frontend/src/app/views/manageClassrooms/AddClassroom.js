import React, { useState, useContext, createContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { nanoid } from "nanoid";
import { Formik, Field } from "formik";
import { SwatchesPicker, CirclePicker } from "react-color";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import { Button, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { addClassroom } from "app/reducers/actions/ClassroomActions";
import Swal from "sweetalert2";
const basicFormSchema = yup.object().shape({
  title: yup.string().required("Please fill out the room name field"),
  eventColor: yup.string().required("Please select a color"),
});
const AddClassroom = () => {
  const { classrooms, dispatch, user, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const colors = [
    "#4D4D4D",
    "#999999",
    "#F44E3B",
    "#FE9200",
    "#FCDC00",
    "#DBDF00",
    "#A4DD00",
    "#68CCCA",
    "#73D8FF",
    "#AEA1FF",
    "#FDA1FF",
    "#333333",
    "#808080",
    "#cccccc",
    "#D33115",
    "#E27300",
    "#FCC400",
    "#B0BC00",
    "#68BC00",
    "#009CE0",
    "#7B64FF",
    "#FA28FF",
    "#000000",
    "#666666",
    "#B3B3B3",
    "#9F0500",
    "#C45100",
    "#FB9E00",
    "#808900",
    "#194D33",
    "#0C797D",
    "#0062B1",
    "#653294",
    "#AB149E",
  ];
  const history = useHistory();
  const handleSubmit = async (values) => {
    const { title, eventColor } = values;

    const classroom = {
      id: nanoid(),
      title: title,
      eventColor: eventColor,
      created: Date.now(),
    };
    setLoading(true);
    await addClassroom(classroom, token)(dispatch);
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
        history.push("/manage/list");
      }
    });
  };
  let selectedColors = [];
  const roomColors = classrooms.map((classroom) =>
    selectedColors.push(classroom.eventColor)
  );
  const filteredColors = colors.filter(
    (color) => !selectedColors.includes(color.toLowerCase())
  );
  console.log(filteredColors);
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[{ name: "Home", path: "/" }, { name: "Add Classroom" }]}
      />
      {classrooms && (
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <strong>
                Please fill all the required (
                <span className="text-danger">*</span>) fields
              </strong>
            </div>
            <Formik
              initialValues={{
                title: "",
                eventColor: "",
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
                    {" "}
                    <div className="card-body">
                      <div className="form-row">
                        <div
                          className={classList({
                            "col-md-6 mb-3": true,
                            "valid-field": !errors.title && touched.title,
                            "invalid-field": errors.title && touched.title,
                          })}
                        >
                          <label htmlFor="title" className="font-weight-bold">
                            Room Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Room Name"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                          <div className="invalid-feedback">{errors.title}</div>
                        </div>
                      </div>
                      <div className="custom-separator"></div>
                      <div
                        className={classList({
                          "mx-0": true,
                          "mt-2": true,
                          "valid-field":
                            !errors.eventColor && touched.eventColor,
                          "invalid-field":
                            errors.eventColor && touched.eventColor,
                        })}
                      >
                        <label
                          htmlFor="eventColor"
                          className="font-weight-bold"
                        >
                          Event color
                          <span className="text-danger font-weight-bold">
                            *
                          </span>
                        </label>
                        <Field name="eventColor">
                          {({ field, form, meta }) => (
                            <CirclePicker
                              styles={{
                                default: {
                                  picker: { width: "50%" },
                                },
                              }}
                              colors={filteredColors}
                              color={values.eventColor}
                              onChangeComplete={(color) => {
                                form.setFieldValue(field.name, color.hex);
                              }}
                            />
                          )}
                        </Field>
                        <div className="invalid-feedback">
                          {errors.eventColor}
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="mc-footer">
                        <Button
                          disabled={loading}
                          className="btn btn-primary mr-2"
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
        </div>
      )}
    </Fragment>
  );
};

export default AddClassroom;
