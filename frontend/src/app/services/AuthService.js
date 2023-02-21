import React from "react";
import Swal from "sweetalert2";
import SweetAlert from "sweetalert2-react";
import { auth } from "./firebase/firebaseAuthService";
import firebase from "firebase/app";
export const login = async (email, password) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const signup = async (email, password) => {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const idToken = await user.getIdToken();
    await firebase.auth().setCustomUserClaims(user.uid, { role: "_admin" });
    console.log("Custom claims set on ID token");
  } catch (error) {
    console.log("Error creating user:", error);
  }
};

export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};

export const logout = () => {
  window.localStorage.removeItem("user");
  auth.signOut();
};

export const updatePassword = async (password, newPassword) => {
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  user
    .reauthenticateWithCredential(credential)
    .then(function () {
      // User re-authenticated.
      user
        .updatePassword(newPassword)
        .then(function () {
          Swal.fire("Success!", "Password updated", "success");
        })
        .catch(function (error) {
          Swal.fire("Failed!", "Password not updated", "error");
          console.log(error);
        });
    })
    .catch(function (error) {
      Swal.fire(
        "Failed!",
        "Incorrect current password please try again",
        "error"
      );
      console.log(error);
    });
};
