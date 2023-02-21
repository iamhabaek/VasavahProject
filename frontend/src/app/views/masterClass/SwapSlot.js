import React, { useContext, Fragment, useState } from "react";
import { Breadcrumb } from "@gull";
import { Link, useParams } from "react-router-dom";
import { Formik } from "formik";
import AppContext from "app/appContext";
import api from "app/api/api";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "../SharedComponents/CustomSelect";
import { Button, Spinner } from "react-bootstrap";
import { swapSlot } from "app/reducers/actions/ClassroomActions";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
const basicFormSchema = yup.object().shape({
  timeSlot: yup.string().required("Time Slot is required"),
});
const SwapSLot = () => {
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
  const classroomSlot = classroomSlots.find(
    (classroomSlot) => classroomSlot.id === id
  );
  const filteredSlots = classroomSlots.filter(
    (slot) => slot.id !== id && slot.resourceId === classroomSlot.resourceId
  );
  const options = filteredSlots.map((slot) => {
    return {
      value: slot.id,
      label: `${
        classrooms.find((classroom) => classroom.id === slot.resourceId)
          ? classrooms.find((classroom) => classroom.id === slot.resourceId)
              .title
          : "No classroom found"
      } ${slot.startTime}-${slot.endTime} Teacher:${
        teachers.find((teacher) => teacher.id === slot.teacher)
          ? teachers.find((teacher) => teacher.id === slot.teacher).teacherName
          : "No Teacher Found"
      } Subject:${slot.subject.label} Course:${slot.course.label}`,
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
      slot1StartDate: slot2.startDate,
      slot1EndDate: slot2.endDate,
      slot1Days: slot2.days,
      slot2Id: slot2.id,
      slot2Start: slot1.startTime,
      slot2End: slot1.endTime,
      slot2StartDate: slot1.startDate,
      slot2EndDate: slot1.endDate,
      slot2Days: slot1.days,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Swap it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await swapSlot(updatedValues, token)(dispatch);
        } catch (error) {
          console.log(error);
        }
      }
    });
    setLoading(false);
  };

  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Occupied List", path: "/masterClass/list" },
          { name: "Swap for slot" },
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
          {({ values, errors, touched, handleSubmit, setFieldValue }) => {
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
                              animation="border"
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
