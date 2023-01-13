import axios from "axios";
import api from "app/api/api";
import Swal from "sweetalert2";
import history from "@history";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { update } from "lodash";
export const ERROR = "ERROR";
export const GET_STUDENT_LIST = "GET_STUDENT_LIST";
export const ADD_STUDENT = "ADD_STUDENT ";
export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const DELETE_STUDENT = "DELETE_STUDENT";
export const GET_SUBJECT_LIST = "GET_SUBJECT_LIST";
export const ADD_SUBJECT = "ADD_SUBJECT";
export const UPDATE_SUBJECT = "UPDATE_SUBJECT";
export const DELETE_SUBJECT = "DELETE_SUBJECT";
export const GET_COURSE_LIST = "GET_COURSE_LIST";
export const ADD_COURSE = "ADD_COURSE";
export const UPDATE_COURSE = "UPDATE_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";
export const GET_TEACHER_LIST = "GET_TEACHER_LIST";
export const ADD_TEACHER = "ADD_TEACHER";
export const UPDATE_TEACHER = "UPDATE_TEACHER";
export const DELETE_TEACHER = "DELETE_TEACHER";
export const GET_CLASSROOM_LIST = "GET_CLASSROOM_LIST";
export const ADD_CLASSROOM = "ADD_CLASSROOM";
export const UPDATE_CLASSROOM = "UPDATE_CLASSROOM";
export const DELETE_CLASSROOM = "DELETE_CLASSROOM";
export const GET_CLASSROOMSLOT_LIST = "GET_CLASSROOMSLOT_LIST";
export const APPLY_SLOT = "APPLY_SLOT";
export const DELETE_SLOT = "DELETE_SLOT";
export const SWAP_SLOT = "SWAP_SLOT";
export const ASSIGN_NEW = "ASSIGN_NEW";
export const DELETE_ASSIGN = "DELETE_ASSIGN";

const baseUrl = "http://localhost:5001/informatics-f4fe2/us-central1/app";

export const getStudentList = () => async (dispatch) => {
  const response = await axios.get(`${baseUrl}/students`);
  console.log(response);
  dispatch({
    type: GET_STUDENT_LIST,
    payload: response.data.data,
  });
};

export const getSubjectList = () => async (dispatch) => {
  const response = await axios.get(`${baseUrl}/subjects`);
  dispatch({
    type: GET_SUBJECT_LIST,
    payload: response.data.data,
  });
};
export const getCourseList = () => async (dispatch) => {
  const response = await axios.get(`${baseUrl}/courses`);
  dispatch({
    type: GET_COURSE_LIST,
    payload: response.data.data,
  });
};
export const getTeacherList = () => async (dispatch) => {
  const response = await axios.get(`${baseUrl}/teachers`);
  dispatch({
    type: GET_TEACHER_LIST,
    payload: response.data.data,
  });
};
export const getClassroomList = () => async (dispatch) => {
  const response = await axios.get(`${baseUrl}/classrooms`);
  dispatch({
    type: GET_CLASSROOM_LIST,
    payload: response.data.data,
  });
};
export const getClassroomSlotList = () => async (dispatch) => {
  const response = await axios.get(`${baseUrl}/classroomSlots`);
  dispatch({
    type: GET_CLASSROOMSLOT_LIST,
    payload: response.data.data,
  });
};
export const addStudent = (student) => async (dispatch) => {
  try {
    const response = await api.post("/students", student);
    console.log(response.data);
    dispatch({
      type: ADD_STUDENT,
      payload: student,
    });
    NotificationManager.success("Student Added Successfully");
    history.push("/students/studentslist");
  } catch (error) {
    Swal.fire(`${error.response.data.message}`, "error");
  }
};
export const updateStudent = (id, student) => async (dispatch) => {
  const response = await api.put(`/students/${id}`, student);
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        dispatch({
          type: UPDATE_STUDENT,
          payload: { id: id, student: student },
        });
        NotificationManager.success("Student Updated", "Success");
        history.push("/students/studentslist");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
export const deleteStudent = (id) => async (dispatch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.delete(`/students/${id}`);
        dispatch({
          type: DELETE_STUDENT,
          payload: id,
        });
        Swal.fire("Deleted!", "Student has been deleted.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
export const addTeacher = (teacher) => async (dispatch) => {
  try {
    const response = await api.post("/teachers", teacher);
    console.log(response.data);
    dispatch({
      type: ADD_TEACHER,
      payload: teacher,
    });
    NotificationManager.success("Teacher Added Successfully");
    history.push("/teachers/teachersList");
  } catch (error) {
    Swal.fire(`${error.response.data.message}`, "error");
  }
};
export const updateTeacher = (id, teacher) => async (dispatch) => {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.put(`/teachers/${id}`, teacher);
        dispatch({
          type: UPDATE_TEACHER,
          payload: { id: id, teacher: teacher },
        });
        NotificationManager.success("Teacher Updated", "Success");
        history.push("/teachers/teachersList");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
export const deleteTeacher = (id) => async (dispatch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.delete(`/teachers/${id}`);
        dispatch({
          type: DELETE_TEACHER,
          payload: id,
        });
        Swal.fire("Deleted!", "Teacher has been deleted.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};

export const addSubject = (subject) => async (dispatch) => {
  try {
    const response = await api.post("/subjects", subject);
    console.log(response.data);
    dispatch({
      type: ADD_SUBJECT,
      payload: subject,
    });
    NotificationManager.success("Subject Added Successfully");
    history.push("/subjects/subjects-list");
  } catch (error) {
    Swal.fire(`${error.response.data.message}`, "error");
  }
};
export const updateSubject = (id, subject) => async (dispatch) => {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.put(`/subjects/${id}`, subject);
        dispatch({
          type: UPDATE_SUBJECT,
          payload: { id: id, subject: subject },
        });
        NotificationManager.success("Subject Updated", "Success");
        history.push("/subjects/subjects-list");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
export const deleteSubject = (id) => async (dispatch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.delete(`/subjects/${id}`);
        dispatch({
          type: DELETE_SUBJECT,
          payload: id,
        });
        Swal.fire("Deleted!", "Subject has been deleted.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};

export const addCourse = (course) => async (dispatch) => {
  try {
    const response = await api.post("/courses", course);
    console.log(response.data);
    dispatch({
      type: ADD_COURSE,
      payload: course,
    });
    NotificationManager.success("Course Added Successfully");
    history.push("/courses/courses-list");
  } catch (error) {
    Swal.fire(`${error.response.data.message}`, "error");
  }
};
export const updateCourse = (id, course) => async (dispatch) => {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.put(`/courses/${id}`, course);
        dispatch({
          type: UPDATE_COURSE,
          payload: { id: id, course: course },
        });
        NotificationManager.success("Course Updated", "Success");
        history.push("/courses/courses-list");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
export const deleteCourse = (id) => async (dispatch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.delete(`/courses/${id}`);
        dispatch({
          type: DELETE_COURSE,
          payload: id,
        });
        Swal.fire("Deleted!", "Course has been deleted.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
export const addClassroom = (classroom) => async (dispatch) => {
  try {
    const response = await api.post("/classrooms", classroom);
    console.log(response.data);
    dispatch({
      type: ADD_CLASSROOM,
      payload: classroom,
    });
    NotificationManager.success("Classroom Added Successfully");
    history.push("/manage/list");
  } catch (error) {
    Swal.fire(`${error.response.data.message}`, "error");
  }
};
export const updateClassroom = (id, classroom) => async (dispatch) => {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.put(`/classrooms/${id}`, classroom);
        dispatch({
          type: UPDATE_CLASSROOM,
          payload: {
            id: id,
            roomName: classroom.roomName,
            timeSlots: classroom.timeSlots,
          },
        });
        NotificationManager.success("Classroom Updated", "Success");
        history.push("/manage/list");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
export const deleteClassroom = (id) => async (dispatch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.delete(`/classrooms/${id}`);
        dispatch({
          type: DELETE_CLASSROOM,
          payload: id,
        });
        Swal.fire("Deleted!", "Classroom has been deleted.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
export const applySlot =
  (id, classroomSlot, updatedTimeSlots, timeSlots) => async (dispatch) => {
    try {
      await api.post("/classroomSlots/", classroomSlot);
      await api.put(`/classrooms/apply/${id}`, updatedTimeSlots);
      dispatch({
        type: APPLY_SLOT,
        payload: {
          id: id,
          classroomSlot: classroomSlot,
          timeSlots: timeSlots,
        },
      });
      NotificationManager.success("Slot Added Successfully");
      history.push("/classrooms/classrooms-list");
    } catch (error) {
      Swal.fire(`${error.response.data.message}`, "error");
    }
  };
export const deleteSlot = (id) => async (dispatch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.delete(`/classroomSlots/${id}`);
        dispatch({
          type: DELETE_SLOT,
          payload: id,
        });
        Swal.fire("Deleted!", "Slot has been deleted.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
export const swapSlot = (updatedValues) => async (dispatch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes,Swap it!",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.put("/classroomSlots/", updatedValues);
        dispatch({
          type: SWAP_SLOT,
          payload: updatedValues,
        });
        Swal.fire("Swapped!", "Slot has been swapped.", "success");
        history.push("/masterClass/list");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
export const assignNew = (id, studentsId) => async (dispatch) => {
  try {
    const response = await api.put(`/classroomSlots/timeSlot/${id}`, {
      studentsId,
    });
    console.log(response.data);
    dispatch({
      type: ASSIGN_NEW,
      payload: { id: id, studentsId: studentsId },
    });
    NotificationManager.success("Students Assigned Successfully");
    history.push("/classrooms/classrooms-assign");
  } catch (error) {
    Swal.fire(`${error.response.data.message}`, "error");
  }
};
export const deleteAssign = (id, studentsId) => async (dispatch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes,Delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        api.put(`/classroomSlots/timeSlot/${id}`, {
          studentsId,
        });
        dispatch({
          type: DELETE_ASSIGN,
          payload: { id: id, studentsId: studentsId },
        });
        Swal.fire("Deleted!", "Student has been deleted.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
