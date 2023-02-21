import axios from "axios";
import api from "app/api/api";
import Swal from "sweetalert2";
import history from "@history";
import NotificationManager from "react-notifications/lib/NotificationManager";

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
export const GET_NOTIFICATION_LIST = "GET_NOTIFICATION_LIST";
export const ADD_NOTIFICATIONS = "ADD_NOTIFICATIONS";
export const UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const APPROVE_SLOT = "APPROVE_SLOT";
export const DENY_SLOT = "DENY_SLOT";
export const GET_USERS = "GET_USERS";
export const UPDATE_ROLE = "UPDATE_ROLE";
export const MULTIPLE_APPLY_SLOT = "MULTIPLE_APPLY_SLOT";
export const GET_REQUESTS = "GET_REQUESTS";
export const ADD_REQUEST = "ADD_REQUEST";
export const APPROVE_CLOSE = "APPROVE_CLOSE";
export const REJECT_CLOSE = "REJECT_CLOSE";
export const APPROVE_SWAP = "APPROVE_SWAP";
export const REJECT_SWAP = "REJECT_SWAP";
export const DELETE_REQUEST = "DELETE_REQUEST";

const baseUrl = "http://127.0.0.1:5001/informatics-3c338/us-central1/app";
// Fetch Student
export const getStudentList = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`${baseUrl}/students`, config);
  dispatch({
    type: GET_STUDENT_LIST,
    payload: response.data.data,
  });
};
export const getRequests = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`${baseUrl}/requests`, config);
  dispatch({
    type: GET_REQUESTS,
    payload: response.data.data,
  });
};
export const getUsers = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`${baseUrl}/users`, config);
  dispatch({
    type: GET_USERS,
    payload: response.data.data,
  });
};
export const getNotifications = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`${baseUrl}/notifications`, config);
  dispatch({
    type: GET_NOTIFICATION_LIST,
    payload: response.data.data,
  });
};
export const getSubjectList = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`${baseUrl}/subjects`, config);
  dispatch({
    type: GET_SUBJECT_LIST,
    payload: response.data.data,
  });
};
export const getCourseList = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`${baseUrl}/courses`, config);
  dispatch({
    type: GET_COURSE_LIST,
    payload: response.data.data,
  });
};
export const getTeacherList = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`${baseUrl}/teachers`, config);
  dispatch({
    type: GET_TEACHER_LIST,
    payload: response.data.data,
  });
};
export const getClassroomList = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`${baseUrl}/classrooms`, config);
  dispatch({
    type: GET_CLASSROOM_LIST,
    payload: response.data.data,
  });
};
export const getClassroomSlotList = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${baseUrl}/classroomSlots`, config);
  dispatch({
    type: GET_CLASSROOMSLOT_LIST,
    payload: response.data.data,
  });
};
export const addStudent =
  (student, notifications, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await api.post("/students", student, config);
      await api.post("/notifications", notifications, config);

      const data = response.data.data;
      dispatch({
        type: ADD_STUDENT,
        payload: data,
      });
      dispatch({
        type: ADD_NOTIFICATIONS,
        payload: notifications,
      });
      NotificationManager.success("Student Added Successfully");
      history.push("/students/studentslist");
    } catch (error) {
      console.log(error);
      Swal.fire(`${error.response.data.message}`, "error");
    }
  };
export const updateStudent =
  (id, student, notifications, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.put(`/students/${id}`, student, config);
    await api.post("/notifications", notifications, config);
    dispatch({
      type: UPDATE_STUDENT,
      payload: { id: id, student: response.data.data },
    });
    dispatch({
      type: ADD_NOTIFICATIONS,
      payload: notifications,
    });
    NotificationManager.success("Student Updated", "Success");
    history.push("/students/studentslist");
  };
export const deleteStudent = (id, notifications, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await api.delete(`/students/${id}`, config);
  await api.post("/notifications", notifications, config);

  dispatch({
    type: DELETE_STUDENT,
    payload: id,
  });
  dispatch({
    type: ADD_NOTIFICATIONS,
    payload: notifications,
  });
};
export const addTeacher =
  (teacher, notifications, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await api.post("/teachers", teacher, config);
      const data = await response.data.data;
      dispatch({
        type: ADD_TEACHER,
        payload: data,
      });
      NotificationManager.success("Teacher Added Successfully");
      history.push("/teachers/teachersList");
    } catch (error) {
      Swal.fire(`${error.response.data.message}`, "error");
    }
  };
export const updateTeacher =
  (id, teacher, notifications, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await api.put(`/teachers/${id}`, teacher, config);
    await api.post("/notifications", notifications, config);
    dispatch({
      type: UPDATE_TEACHER,
      payload: { id: id, teacher: teacher },
    });
    dispatch({
      type: ADD_NOTIFICATIONS,
      payload: notifications,
    });
    NotificationManager.success("Teacher Updated", "Success");
    history.push("/teachers/teachersList");
  };
export const deleteTeacher = (id, notifications, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await api.delete(`/teachers/${id}`, config);
  await api.post("/notifications", notifications, config);
  dispatch({
    type: DELETE_TEACHER,
    payload: id,
  });
  dispatch({
    type: ADD_NOTIFICATIONS,
    payload: notifications,
  });
};

export const addSubject =
  (subject, notifications, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await api.post("/subjects", subject, config);
      await api.post("/notifications", notifications, config);

      console.log(response.data);
      dispatch({
        type: ADD_SUBJECT,
        payload: subject,
      });
      dispatch({
        type: ADD_NOTIFICATIONS,
        payload: notifications,
      });
      NotificationManager.success("Subject Added Successfully");
      history.push("/subjects/subjects-list");
    } catch (error) {
      Swal.fire(`${error.response.data.message}`, "error");
    }
  };
export const updateSubject =
  (id, subject, notifications, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await api.put(`/subjects/${id}`, subject, config);
    api.post("/notifications", notifications, config);
    dispatch({
      type: ADD_NOTIFICATIONS,
      payload: notifications,
    });
    dispatch({
      type: UPDATE_SUBJECT,
      payload: { id: id, subject: subject },
    });
    NotificationManager.success("Subject Updated", "Success");
    history.push("/subjects/subjects-list");
  };
export const deleteSubject = (id, notifications, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
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
        api.delete(`/subjects/${id}`, config);
        api.post("/notifications", notifications, config);

        dispatch({
          type: DELETE_SUBJECT,
          payload: id,
        });
        dispatch({
          type: ADD_NOTIFICATIONS,
          payload: notifications,
        });
        Swal.fire("Deleted!", "Subject has been deleted.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};

export const addCourse = (course, notifications, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.post("/courses", course, config);
    api.post("/notifications", notifications, config);
    dispatch({
      type: ADD_COURSE,
      payload: course,
    });
    dispatch({
      type: ADD_NOTIFICATIONS,
      payload: notifications,
    });
    NotificationManager.success("Course Added Successfully");
    history.push("/courses/courses-list");
  } catch (error) {
    Swal.fire(`${error.response.data.message}`, "error");
  }
};
export const updateCourse =
  (id, course, notifications, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await api.post("/notifications", notifications, config);
    await api.put(`/courses/${id}`, course, config);
    dispatch({
      type: UPDATE_COURSE,
      payload: { id: id, course: course },
    });
    dispatch({
      type: ADD_NOTIFICATIONS,
      payload: notifications,
    });
    NotificationManager.success("Course Updated", "Success");
    history.push("/courses/courses-list");
  };
export const deleteCourse = (id, notifications, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
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
        api.delete(`/courses/${id}`, config);
        api.post("/notifications", notifications, config);
        dispatch({
          type: DELETE_COURSE,
          payload: id,
        });
        dispatch({
          type: ADD_NOTIFICATIONS,
          payload: notifications,
        });
        Swal.fire("Deleted!", "Course has been deleted.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
export const addClassroom = (classroom, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.post("/classrooms", classroom, config);
    const data = response.data.data;
    dispatch({
      type: ADD_CLASSROOM,
      payload: data,
    });
    NotificationManager.success("Classroom Added Successfully");
    history.push("/classrooms/schedule");
  } catch (error) {
    Swal.fire(`${error.response.data.message}`, "error");
  }
};
export const updateClassroom = (id, classroom, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await api.put(`/classrooms/${id}`, classroom, config);
  dispatch({
    type: UPDATE_CLASSROOM,
    payload: {
      id: id,
      title: classroom.title,
      eventColor: classroom.eventColor,
      modified: classroom.modified,
    },
  });
  NotificationManager.success("Classroom Updated", "Success");
  history.push("/manage/list");
};
export const deleteClassroom = (id, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
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
        api.delete(`/classrooms/${id}`, config);
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
export const applySlot = (classroomSlot, token) => async (dispatch) => {
  dispatch({
    type: APPLY_SLOT,
    payload: {
      classroomSlot: classroomSlot,
    },
  });
};
export const multipleApplySlot = (classroomSlot, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await api.post(`/classroomSlots/multiple`, classroomSlot, config);
    dispatch({
      type: MULTIPLE_APPLY_SLOT,
      payload: classroomSlot,
    });
    NotificationManager.success("Slot Applied Successfully");
    history.push("/classrooms/schedule");
  } catch (error) {
    getClassroomSlotList(token)(dispatch);
    Swal.fire(`${error.response.data.message}`, "error");
  }
};
export const cancelSlot = (id, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await api.delete(`/classroomSlots/${id}`, config);
  dispatch({
    type: DELETE_SLOT,
    payload: { id: id },
  });
};

export const deleteSlot = (id, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await api.delete(`/classroomSlots/${id}`, config);
        dispatch({
          type: DELETE_SLOT,
          payload: { id: id },
        });
        Swal.fire("Deleted!", "Slot has been deleted.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};

export const swapSlot =
  (updatedValues, notifications, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await api.put("/classroomSlots/", updatedValues, config);
    dispatch({
      type: SWAP_SLOT,
      payload: updatedValues,
    });
    Swal.fire("Swapped!", "Slot has been swapped.", "success");
    history.push("/masterClass/list");
  };
export const assignNew =
  (id, studentsId, notifications, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await api.put(
        `/classroomSlots/timeSlot/${id}`,
        {
          studentsId,
        },
        config
      );
      await api.post("/notifications", notifications, config);

      console.log(response.data);
      dispatch({
        type: ASSIGN_NEW,
        payload: { id: id, studentsId: studentsId },
      });
      dispatch({
        type: ADD_NOTIFICATIONS,
        payload: notifications,
      });
      NotificationManager.success("Students Assigned Successfully");
      history.push("/classrooms/my-classes");
    } catch (error) {
      Swal.fire(`${error.response.data.message}`, "error");
    }
  };
export const deleteAssign =
  (id, studentsId, notifications, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
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
          api.put(
            `/classroomSlots/timeSlot/${id}`,
            {
              studentsId,
            },
            config
          );
          api.post("/notifications", notifications, config);

          dispatch({
            type: DELETE_ASSIGN,
            payload: { id: id, studentsId: studentsId },
          });
          dispatch({
            type: ADD_NOTIFICATIONS,
            payload: notifications,
          });
          Swal.fire("Deleted!", "Student has been deleted.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

export const updateNotification = (id, isViewed, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(isViewed);
  await api.put(`/notifications/${id}`, isViewed, config);
  dispatch({
    type: UPDATE_NOTIFICATION,
    payload: { id: id, isViewed },
  });
};
export const deleteNotification = (id, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await api.delete(`/notifications/${id}`, config);
  dispatch({
    type: DELETE_NOTIFICATION,
    payload: id,
  });
};
export const approveSlot = (id, status, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await api.put(`/classroomSlots/approve/${id}`, status, config);
  dispatch({
    type: APPROVE_SLOT,
    payload: { id, status },
  });
  NotificationManager.success("Slot approved successfully");
  history.push("/classrooms/application-slot-list");
};
export const denySlot =
  (id, classroomId, timeSlots, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await api.delete(`/classroomSlots/deny/${id}`, config);
    dispatch({
      type: DENY_SLOT,
      payload: { id },
    });
    NotificationManager.success("Slot denied");
    history.push("/classrooms/application-slot-list");
  };

export const updateRole = (id, newRole, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await api.post("/users/updateRole", { id: id, newRole: newRole }, config);
  dispatch({
    type: UPDATE_ROLE,
    payload: { id, newRole },
  });
  NotificationManager.success("User role updated");
  history.push("/user/users-list");
};

export const addRequest = (request, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.post("/requests", request, config);

    const data = response.data.data;
    dispatch({
      type: ADD_REQUEST,
      payload: data,
    });

    NotificationManager.success("Close schedule request is successful");
    Swal.fire("Success", "Close schedule request is successful.", "success");
    if (data.type === "Close") {
      history.push("/requests/close-schedule-list");
    } else {
      history.push("/requests/swap-schedule-list");
    }
  } catch (error) {
    console.log(error);
    Swal.fire(`${error.response.data.message}`, "error");
  }
};
export const deleteRequest = (id, type, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await api.delete(`/requests/${id}`, config);
  dispatch({
    type: DELETE_REQUEST,
    payload: id,
  });

  NotificationManager.success("Request cancelled");
  Swal.fire(
    "Success",
    "Close schedule request is successful cancelled.",
    "success"
  );
  if (type === "Close") {
    history.push("/requests/close-schedule-list");
  } else {
    history.push("/requests/swap-schedule-list");
  }
};
export const approveClose =
  (id, schedId, status, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await api.put(`/requests/${id}`, status, config);
    await api.delete(`/classroomSlots/${schedId}`, config);
    dispatch({
      type: APPROVE_CLOSE,
      payload: { id, status, schedId },
    });
    NotificationManager.success("Close classroom schedule approved");
    history.push("/classrooms/close-schedule-list");
  };
export const rejectClose = (id, status, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await api.put(`/requests/${id}`, status, config);
  dispatch({
    type: REJECT_CLOSE,
    payload: { id, status },
  });
  NotificationManager.success("Close classroom schedule rejected");
  history.push("/classrooms/close-schedule-list");
};
export const approveSwap =
  (id, updatedValues, status, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await api.put(`/requests/${id}`, status, config);
    await api.put("/classroomSlots/", updatedValues, config);
    dispatch({
      type: APPROVE_SWAP,
      payload: { id, status, updatedValues },
    });
    Swal.fire("Swapped!", "Schedule has been swapped.", "success");
    history.push("/classrooms/swap-schedule-list");
  };

export const rejectSwap = (id, status, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await api.put(`/requests/${id}`, status, config);
  dispatch({
    type: REJECT_SWAP,
    payload: { id, status },
  });
  NotificationManager.success("Swap classroom schedule rejected");
  history.push("/classrooms/swap-schedule-list");
};
