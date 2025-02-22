/* eslint-disable react/prop-types */
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase.init/firebase";
// provider
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        console.log("USER-EMAIL==>", currentUser.email);
      } else {
        setUser(null);
        setLoading(false);
        console.log("USER-EMAIL==>", currentUser?.email || "Sign out");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // user log in
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // github
  const loginWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const userSignOut = () => {
    signOut(auth);
  };
  const authInfo = {
    user,
    loading,
    loginWithGithub,
    loginWithGoogle,
    userSignOut,
    notifications,
    setNotifications,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
