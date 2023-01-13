import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import routes from "./RootRoutes";
import ClassroomReducer from "./reducers/reducers/ClassroomReducer";
import { auth } from "./services/firebase/firebaseAuthService";
import { login, signup, resetPassword, logout } from "./services/AuthService";
import { getItem, setItem } from "./services/localStorageService";
import { initialState } from "./reducers/reducers/ClassroomReducer";
import {
  getClassroomList,
  getClassroomSlotList,
  getCourseList,
  getStudentList,
  getSubjectList,
  getTeacherList,
} from "./reducers/actions/ClassroomActions";
const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClassroomReducer, initialState);
  const [token, setToken] = useState();
  const [user, setUser] = useState(null || getItem("user"));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getStudentList()(dispatch);
    getSubjectList()(dispatch);
    getCourseList()(dispatch);
    getTeacherList()(dispatch);
    getClassroomList()(dispatch);
    getClassroomSlotList()(dispatch);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setItem("user", user);
        setLoading(false);
        user.getIdToken().then((token) => setToken(token));
      }
    });
    return () => unsubscribe;
  });

  const value = {
    user,
    setUser,
    routes,
    students: state.students,
    subjects: state.subjects,
    courses: state.courses,
    teachers: state.teachers,
    classrooms: state.classrooms,
    classroomSlots: state.classroomSlots,
    isError: state.isError,
    isSuccess: state.isSuccess,
    message: state.message,
    login,
    logout,
    signup,
    resetPassword,
    dispatch,
  };
  console.log(state);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
export const useApp = () => {
  return useContext(AppContext);
};
