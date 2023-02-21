import React, { useState, useContext, useEffect, Fragment } from "react";
import { Breadcrumb } from "@gull";
import { useHistory, useParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { Formik, Field } from "formik";
import AppContext from "app/appContext";
import * as yup from "yup";
import { classList } from "@utils";
import CustomMultiSelect from "../SharedComponents/CustomMultiSelect";
import { assignNew } from "app/reducers/actions/ClassroomActions";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import { format } from "date-fns";
const basicFormSchema = yup.object().shape({
  studentId: yup.array().required("Student is required"),
});

const AssignNew = () => {
  const {
    classrooms,
    students,
    teachers,
    subjects,
    classroomSlots,
    dispatch,
    user,
    token,
  } = useContext(AppContext);
  const history = useHistory();
  const { id } = useParams();
  const initialState = {
    studentId: "",
  };
  const [loading, setLoading] = useState(false);
  // Finding instance of a slot
  const classroomSlot = classroomSlots.find(
    (classroomSlot) => classroomSlot.id === id
  );

  // finding the data of assigned students
  const filteredStudents =
    classroomSlot &&
    students.filter(
      (student) =>
        student.course === classroomSlot.course.label &&
        student.yearLevel === classroomSlot.yearLevel.label
    );
  const filterAlready =
    filteredStudents &&
    filteredStudents.filter(
      (student) => !classroomSlot.studentsId.includes(student.id)
    );
  const options =
    // filterAlready &&
    filterAlready &&
    filterAlready.map((student) => {
      return {
        value: student.id,
        label: `${student.name}`,
      };
    });
  const handleSubmit = async (values) => {
    const { studentId } = values;
    let studentsId = [...classroomSlot.studentsId];
    studentId.map((student) => studentsId.push(student.value));
    // Action for assigning new students
    const notifications = {
      id: nanoid(),
      created: Date.now(),
      user: user.email,
      isViewed: false,
      action: "assign",
      content: {
        name: "students",
        location: "assign",
        description: "click to see more information",
      },
    };
    setLoading(true);

    await assignNew(id, studentsId, notifications, token)(dispatch);
    setLoading(false);
  };
  const handleCancel = () => {
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
        history.push("/classrooms/my-classes");
      }
    });
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

      {subjects &&
        classrooms &&
        teachers &&
        filteredStudents &&
        classroomSlot &&
        classroomSlots &&
        students &&
        options && (
          <div className="card">
            <div className="d-flex flex-row justify-content-between p-2">
              <h5>
                Room:{" "}
                {classrooms.find(
                  (classroom) => classroom.id === classroomSlot.classroomId
                ) &&
                  classrooms.find(
                    (classroom) => classroom.id === classroomSlot.classroomId
                  ).roomName}
              </h5>
              <h5>
                <span>
                  Time:{" "}
                  {`${format(
                    new Date(0, 0, 0, classroomSlot.startTime),
                    "h:mm aa"
                  )}-${format(
                    new Date(0, 0, 0, classroomSlot.endTime),
                    "h:mm aa"
                  )}`}
                </span>
              </h5>
              <h5>
                Teacher:{" "}
                {teachers.find(
                  (teacher) => teacher.id === classroomSlot.teacher
                )
                  ? teachers.find(
                      (teacher) => teacher.id === classroomSlot.teacher
                    ).teacherName
                  : "No Teacher Found"}
              </h5>
              <h5>Subject: {classroomSlot.subject.label}</h5>
              <h5>Course: {classroomSlot.course.label}</h5>
              <h5>Year Level: {classroomSlot.yearLevel.label}</h5>
            </div>
            <Formik
              initialValues={initialState}
              validationSchema={basicFormSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleSubmit }) => {
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
                            <Button
                              disabled={loading}
                              className=" text-12 btn btn-primary m-1"
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
                            <button
                              type="button"
                              className="btn btn-danger m-1"
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
