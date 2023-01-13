import { auth } from "./firebase/firebaseAuthService";

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};

export const logout = () => {
  window.localStorage.removeItem("user");
  auth.signOut();
};
