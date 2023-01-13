import React, { useContext, Fragment, useState } from "react";
import { Breadcrumb } from "@gull";
import { Link, useHistory, useParams } from "react-router-dom";
import { Formik } from "formik";
import AppContext from "app/appContext";
import api from "app/api/api";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "./CustomSelect";
import Swal from "sweetalert2";
import { Button, Spinner } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { swapSlot } from "app/reducers/actions/ClassroomActions";

const basicFormSchema = yup.object().shape({
  timeSlot: yup.string().required("Time Slot is required"),
});
const SwapSLot = () => {
  const { classrooms, classroomSlots, dispatch } = useContext(AppContext);
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const classroomSlot = classroomSlots.find(
    (classroomSlot) => classroomSlot.id === id
  );
  const filteredSlots = classroomSlots.filter(
    (slot) => slot.id !== id && slot.classroomId === classroomSlot.classroomId
  );
  const options = filteredSlots.map((slot) => {
    return {
      value: slot.id,
      label: `${
        classrooms.find((classroom) => classroom.id === slot.classroomId)
          .roomName
      } ${slot.startTime}-${slot.endTime} Teacher:${slot.teacher} Subject:${
        slot.subject
      } Course:${slot.course}}`,
    };
  });
  const handleSubmit = async (values) => {
    const { timeSlot } = values;
    const slot1 = classroomSlots.find(
      (classroomSlot) => classroomSlot.id === timeSlot
    );
    const slot2 = classroomSlot;
    const updatedValues = {
      slot1Id: slot1.id,
      slot1Start: slot2.startTime,
      slot1End: slot2.endTime,
      slot2Id: slot2.id,
      slot2Start: slot1.startTime,
      slot2End: slot1.endTime,
    };
    setLoading(true);
    swapSlot(updatedValues)(dispatch);
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
      <div className="card">
        <Formik
          initialValues={{
            timeSlot: "",
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
                <div className="card-body">
                  <div className="form-row">
                    <div
                      className={classList({
                        "form-group col-md-6": true,
                        "invalid-field": errors.teacher && touched.teacher,
                      })}
                    >
                      <label htmlFor="timeSlot" className="ul-form__label">
                        Choose Time Slot:
                      </label>
                      <CustomSelect
                        name="timeSlot"
                        options={options}
                        onChange={(value) =>
                          setFieldValue("timeSlot", value.value)
                        }
                        value={values.timeSlot}
                        required
                      />
                      <div className="invalid-feedback">
                        Time Slot is required
                      </div>
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
                        <Link to="/masterClass/list">
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
    </Fragment>
  );
};

export default SwapSLot;
