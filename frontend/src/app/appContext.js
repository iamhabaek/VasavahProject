import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import routes from "./RootRoutes";
import firebase from "firebase/app";

import ClassroomReducer from "./reducers/reducers/ClassroomReducer";
import { login, signup, resetPassword, logout } from "./services/AuthService";
import { getItem } from "./services/localStorageService";
import { initialState } from "./reducers/reducers/ClassroomReducer";
import {
  getClassroomList,
  getClassroomSlotList,
  getCourseList,
  getStudentList,
  getSubjectList,
  getTeacherList,
  getNotifications,
  getUsers,
  getRequests,
} from "./reducers/actions/ClassroomActions";
const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClassroomReducer, initialState);
  const [token, setToken] = useState();
  const [user, setUser] = useState(null || getItem("user"));
  const [role, setRole] = useState();

  useEffect(() => {
    if (token) {
      getNotifications(token)(dispatch);
      getStudentList(token)(dispatch);
      getSubjectList(token)(dispatch);
      getCourseList(token)(dispatch);
      getTeacherList(token)(dispatch);
      getClassroomList(token)(dispatch);
      getClassroomSlotList(token)(dispatch);
      getUsers(token)(dispatch);
      getRequests(token)(dispatch);
    }
  }, [token]);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Get the custom claims and ID token
          const idTokenResult = await user.getIdTokenResult();
          const customClaims = idTokenResult.claims;
          const idToken = idTokenResult.token;
          setUser({
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: customClaims.role,
          });
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              displayName: user.displayName,
              photoURL: user.photoURL,
              role: customClaims.role,
            })
          );
          setToken(idToken);
        } catch (error) {
          console.error(error);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  const value = {
    user,
    setUser,
    routes,
    token,
    requests: state.requests,
    users: state.users,
    students: state.students,
    subjects: state.subjects,
    courses: state.courses,
    teachers: state.teachers,
    classrooms: state.classrooms,
    classroomSlots: state.classroomSlots,
    isError: state.isError,
    isSuccess: state.isSuccess,
    message: state.message,
    notifications: state.notifications,
    login,
    logout,
    signup,
    resetPassword,
    dispatch,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
export const useApp = () => {
  return useContext(AppContext);
};
