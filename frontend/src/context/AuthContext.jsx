import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { syncUser } from "../api/authApi";
import { auth, hasFirebaseConfig } from "../firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function syncCurrentUser() {
    const data = await syncUser();
    setDbUser(data.user);
    return data.user;
  }

  async function login(email, password) {
    if (!auth) {
      throw new Error("Firebase config is missing");
    }

    await signInWithEmailAndPassword(auth, email, password);
    return syncCurrentUser();
  }

  async function register({ email, password, nickname }) {
    if (!auth) {
      throw new Error("Firebase config is missing");
    }

    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (nickname) {
      await updateProfile(credential.user, {
        displayName: nickname,
      });
    }

    return syncCurrentUser();
  }

  async function logout() {
    if (!auth) {
      setDbUser(null);
      return;
    }

    await signOut(auth);
    setDbUser(null);
  }

  useEffect(() => {
    if (!hasFirebaseConfig || !auth) {
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      if (!user) {
        setDbUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await syncUser();
        setDbUser(data.user);
      } catch (error) {
        setDbUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      dbUser,
      firebaseUser,
      isAuthenticated: Boolean(firebaseUser),
      loading,
      login,
      logout,
      register,
      setDbUser,
      syncCurrentUser,
      hasFirebaseConfig,
    }),
    [dbUser, firebaseUser, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
