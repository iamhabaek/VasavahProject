import { DELETE_NOTIFICATION } from "app/redux/actions/NotificationActions";
import {
  ADD_STUDENT,
  ADD_TEACHER,
  DELETE_STUDENT,
  DELETE_TEACHER,
  UPDATE_TEACHER,
  GET_CLASSROOMSLOT_LIST,
  GET_CLASSROOM_LIST,
  GET_COURSE_LIST,
  GET_NOTIFICATION_LIST,
  GET_STUDENT_LIST,
  GET_SUBJECT_LIST,
  GET_TEACHER_LIST,
  UPDATE_STUDENT,
  ADD_SUBJECT,
  UPDATE_SUBJECT,
  DELETE_SUBJECT,
  ADD_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  ADD_CLASSROOM,
  UPDATE_CLASSROOM,
  DELETE_CLASSROOM,
  APPLY_SLOT,
  DELETE_SLOT,
  SWAP_SLOT,
  ASSIGN_NEW,
  DELETE_ASSIGN,
  ADD_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  APPROVE_SLOT,
  DENY_SLOT,
  GET_USERS,
  UPDATE_ROLE,
  MULTIPLE_APPLY_SLOT,
  GET_REQUESTS,
  ADD_REQUEST,
  APPROVE_CLOSE,
  REJECT_CLOSE,
  APPROVE_SWAP,
  REJECT_SWAP,
  DELETE_REQUEST,
} from "../actions/ClassroomActions";

export const initialState = {
  students: [],
  subjects: [],
  courses: [],
  teachers: [],
  classrooms: [],
  classroomSlots: [],
  notifications: [],
  users: [],
  requests: [],
};

const StudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ROLE: {
      return {
        ...state,
        users: state.users.map((user) =>
          user.uid === action.payload.id
            ? { ...user, customClaims: { role: action.payload.newRole } }
            : user
        ),
      };
    }
    case GET_REQUESTS: {
      return {
        ...state,
        requests: action.payload,
      };
    }
    case GET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case GET_STUDENT_LIST: {
      return {
        ...state,
        students: action.payload,
      };
    }
    case GET_SUBJECT_LIST: {
      return {
        ...state,
        subjects: action.payload,
      };
    }
    case GET_NOTIFICATION_LIST: {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    case GET_COURSE_LIST: {
      return {
        ...state,
        courses: action.payload,
      };
    }
    case ADD_NOTIFICATIONS: {
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    }
    case GET_TEACHER_LIST: {
      return {
        ...state,
        teachers: action.payload,
      };
    }
    case GET_CLASSROOM_LIST: {
      return {
        ...state,
        classrooms: action.payload,
      };
    }
    case GET_CLASSROOMSLOT_LIST: {
      return {
        ...state,
        classroomSlots: action.payload,
      };
    }
    case ADD_STUDENT: {
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    }
    case UPDATE_STUDENT: {
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload.student : student
        ),
      };
    }
    case DELETE_STUDENT: {
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      };
    }
    case ADD_TEACHER: {
      return {
        ...state,
        teachers: [...state.teachers, action.payload],
      };
    }
    case UPDATE_TEACHER: {
      return {
        ...state,
        teachers: state.teachers.map((teacher) =>
          teacher.id === action.payload.id ? action.payload.teacher : teacher
        ),
      };
    }
    case DELETE_TEACHER: {
      return {
        ...state,
        teachers: state.teachers.filter(
          (teacher) => teacher.id !== action.payload
        ),
      };
    }
    case ADD_SUBJECT: {
      return {
        ...state,
        subjects: [...state.subjects, action.payload],
      };
    }
    case UPDATE_SUBJECT: {
      return {
        ...state,
        subjects: state.subjects.map((subject) =>
          subject.id === action.payload.id ? action.payload.subject : subject
        ),
      };
    }
    case DELETE_SUBJECT: {
      return {
        ...state,
        subjects: state.subjects.filter(
          (subject) => subject.id !== action.payload
        ),
      };
    }
    case ADD_COURSE: {
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    }
    case UPDATE_COURSE: {
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.id === action.payload.id ? action.payload.course : course
        ),
      };
    }
    case DELETE_COURSE: {
      return {
        ...state,
        courses: state.courses.filter((course) => course.id !== action.payload),
      };
    }
    case ADD_CLASSROOM: {
      return {
        ...state,
        classrooms: [...state.classrooms, action.payload],
      };
    }
    case UPDATE_CLASSROOM: {
      return {
        ...state,
        classrooms: state.classrooms.map((classroom) =>
          classroom.id === action.payload.id
            ? {
                ...classroom,
                title: action.payload.title,
                eventColor: action.payload.eventColor,
                modified: action.payload.modified,
              }
            : classroom
        ),
      };
    }
    case DELETE_CLASSROOM: {
      return {
        ...state,
        classrooms: state.classrooms.filter(
          (classroom) => classroom.id !== action.payload
        ),
        classroomSlots: state.classroomSlots.filter(
          (slot) => slot.resourceId !== action.payload
        ),
      };
    }
    case APPLY_SLOT: {
      return {
        ...state,
        classroomSlots: [...state.classroomSlots, action.payload.classroomSlot],
      };
    }
    case MULTIPLE_APPLY_SLOT: {
      return {
        ...state,
        classroomSlots: [...state.classroomSlots, ...action.payload],
      };
    }
    case DELETE_SLOT: {
      return {
        ...state,
        classroomSlots: state.classroomSlots.filter(
          (slot) => slot.id !== action.payload.id
        ),
      };
    }
    case SWAP_SLOT: {
      return {
        ...state,
        classroomSlots: state.classroomSlots.map((classroomSlot) =>
          classroomSlot.id === action.payload.slot1Id
            ? {
                ...classroomSlot,
                startTime: action.payload.slot1Start,
                endTime: action.payload.slot1End,
                startDate: action.payload.slot1StartDate,
                endDate: action.payload.slot1EndDate,
                days: action.payload.slot1Days,
              }
            : classroomSlot && classroomSlot.id === action.payload.slot2Id
            ? {
                ...classroomSlot,
                startTime: action.payload.slot2Start,
                endTime: action.payload.slot2End,
                startDate: action.payload.slot2StartDate,
                endDate: action.payload.slot2EndDate,
                days: action.payload.slot2Days,
              }
            : classroomSlot
        ),
      };
    }
    case ASSIGN_NEW: {
      return {
        ...state,
        classroomSlots: state.classroomSlots.map((classroomSlot) =>
          classroomSlot.id === action.payload.id
            ? {
                ...classroomSlot,
                studentsId: action.payload.studentsId,
              }
            : classroomSlot
        ),
      };
    }
    case DELETE_ASSIGN: {
      return {
        ...state,
        classroomSlots: state.classroomSlots.map((classroomSlot) =>
          classroomSlot.id === action.payload.id
            ? { ...classroomSlot, studentsId: action.payload.studentsId }
            : classroomSlot
        ),
      };
    }
    case UPDATE_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload.id
            ? { ...notification, isViewed: action.payload.isViewed }
            : notification
        ),
      };
    }
    case DELETE_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    }
    case APPROVE_SLOT: {
      return {
        ...state,
        classroomSlots: state.classroomSlots.map((classroom) =>
          classroom.id === action.payload.id
            ? { ...classroom, isApproved: action.payload.status.isApproved }
            : classroom
        ),
      };
    }
    case DENY_SLOT: {
      return {
        ...state,
        classroomSlots: state.classroomSlots.filter(
          (classroom) => classroom.id !== action.payload.id
        ),
      };
    }
    case ADD_REQUEST: {
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    }
    case APPROVE_CLOSE: {
      return {
        ...state,
        classroomSlots: state.classroomSlots.filter(
          (classroom) => classroom.id !== action.payload.schedId
        ),
        requests: state.requests.map((req) =>
          req.id === action.payload.id
            ? { ...req, status: action.payload.status.status }
            : req
        ),
      };
    }
    case REJECT_CLOSE: {
      return {
        ...state,
        requests: state.requests.map((req) =>
          req.id === action.payload.id
            ? {
                ...req,
                status: action.payload.status.status,
                adminReason: action.payload.status.adminReason,
              }
            : req
        ),
      };
    }
    case DELETE_REQUEST: {
      return {
        ...state,
        requests: state.requests.filter((req) => req.id !== action.payload),
      };
    }
    case APPROVE_SWAP: {
      return {
        ...state,
        classroomSlots: state.classroomSlots.map((classroomSlot) =>
          classroomSlot.id === action.payload.updatedValues.slot1Id
            ? {
                ...classroomSlot,
                startTime: action.payload.updatedValues.slot1Start,
                endTime: action.payload.updatedValues.slot1End,
                startDate: action.payload.updatedValues.slot1StartDate,
                endDate: action.payload.updatedValues.slot1EndDate,
                days: action.payload.updatedValues.slot1Days,
              }
            : classroomSlot &&
              classroomSlot.id === action.payload.updatedValues.slot2Id
            ? {
                ...classroomSlot,
                startTime: action.payload.updatedValues.slot2Start,
                endTime: action.payload.updatedValues.slot2End,
                startDate: action.payload.updatedValues.slot2StartDate,
                endDate: action.payload.updatedValues.slot2EndDate,
                days: action.payload.updatedValues.slot2Days,
              }
            : classroomSlot
        ),
        requests: state.requests.map((req) =>
          req.id === action.payload.id
            ? { ...req, status: action.payload.status.status }
            : req
        ),
      };
    }
    case REJECT_SWAP: {
      return {
        ...state,
        requests: state.requests.map((req) =>
          req.id === action.payload.id
            ? {
                ...req,
                status: action.payload.status.status,
                adminReason: action.payload.status.adminReason,
              }
            : req
        ),
      };
    }
  }
};

export default StudentReducer;
