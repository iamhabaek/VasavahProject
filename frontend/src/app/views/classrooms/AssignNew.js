import React, { useState, useContext, createContext, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { Formik, Field } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import CustomSelect from "./CustomSelect";
import CustomMultiSelect from "./CustomMultiSelect";
import api from "app/api/api";
import { assignNew } from "app/reducers/actions/ClassroomActions";

const basicFormSchema = yup.object().shape({
  studentId: yup.array().required("Student is required"),
});

const AssignNew = () => {
  const { classrooms, students, classroomSlots, dispatch } =
    useContext(AppContext);
  const history = useHistory();
  const { id } = useParams();
  const initialState = {
    studentId: "",
  };
  // Finding instance of a slot
  const classroomSlot = classroomSlots.find(
    (classroomSlot) => classroomSlot.id === id
  );
  const classroom = classrooms.find(
    (classroom) => classroom.id === classroomSlot.classroomId
  );
  // finding the data of assigned students
  const filteredStudents = students.filter(
    (student) =>
      student.course === classroomSlot.course &&
      student.yearLevel === classroomSlot.yearLevel
  );

  const options = filteredStudents.map((student) => {
    return {
      value: student.id,
      label: `${student.name}`,
    };
  });
  const handleSubmit = async (values) => {
    const { studentId } = values;
    let studentsId = [];
    studentId.map((student) => studentsId.push(student.value));
    // Action for assigning new students
    assignNew(id, studentsId)(dispatch);
  };
  const handleCancel = () => {
    history.push("/classrooms/classrooms-assign");
  };
  return (
    <Fragment>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          {
            name: "Assign and Generate",
            path: "/classrooms/classrooms-assign",
          },
          { name: "Assign Student" },
        ]}
      />
      {classroom && (
        <div className="card">
          <div className="d-flex flex-row justify-content-between p-2">
            <h5>Room: {classroom.roomName}</h5>
            <h5>
              Time: {`${classroomSlot.startTime} - ${classroomSlot.endTime}`}
            </h5>
            <h5>Teacher: {classroomSlot.teacher}</h5>
            <h5>Subject: {classroomSlot.subject}</h5>
            <h5>Course: {classroomSlot.course}</h5>
            <h5>Year Level: {classroomSlot.yearLevel}</h5>
          </div>
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
                          "invalid-field":
                            errors.studentId && touched.studentId,
                        })}
                      >
                        <label htmlFor="studentId" className="ul-form__label">
                          Students:
                        </label>
                        <Field
                          name="studentId"
                          component={CustomMultiSelect}
                          options={options}
                          value={values.studentId}
                          required
                        />
                        <div className="invalid-feedback">
                          Student is required
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
                            Submit
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
      )}
    </Fragment>
  );
};

export default AssignNew;
