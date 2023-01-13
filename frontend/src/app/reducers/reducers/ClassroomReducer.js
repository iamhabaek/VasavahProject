import {
  ADD_STUDENT,
  ADD_TEACHER,
  DELETE_STUDENT,
  DELETE_TEACHER,
  UPDATE_TEACHER,
  ERROR,
  GET_CLASSROOMSLOT_LIST,
  GET_CLASSROOM_LIST,
  GET_COURSE_LIST,
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
} from "../actions/ClassroomActions";

export const initialState = {
  students: [],
  subjects: [],
  courses: [],
  teachers: [],
  classrooms: [],
  classroomSlots: [],
};

const StudentReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case GET_COURSE_LIST: {
      return {
        ...state,
        courses: action.payload,
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
                roomName: action.payload.roomName,
                timeSlots: action.payload.timeSlots,
              }
            : classroom
        ),
        classroomSlots: state.classroomSlots.filter(
          (slot) => slot.id != action.payload.id
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
          (slot) => slot.id !== action.payload
        ),
      };
    }
    case APPLY_SLOT: {
      return {
        ...state,
        classroomSlots: [...state.classroomSlots, action.payload.classroomSlot],
        classrooms: state.classrooms.map((classroom) =>
          classroom.id === action.payload.id
            ? { ...classroom, timeSlots: action.payload.timeSlots }
            : classroom
        ),
      };
    }
    case DELETE_SLOT: {
      return {
        ...state,
        classroomSlots: state.classroomSlots.filter(
          (slot) => slot.id !== action.payload
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
              }
            : classroomSlot && classroomSlot.id === action.payload.slot2Id
            ? {
                ...classroomSlot,
                startTime: action.payload.slot2Start,
                endTime: action.payload.slot2End,
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
            ? { ...classroomSlot, studentsId: action.payload.studentsId }
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
  }
};
export default StudentReducer;
