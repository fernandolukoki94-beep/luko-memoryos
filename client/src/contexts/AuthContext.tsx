import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserProfile } from "@/lib/types";

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserProfile(userDocSnap.data() as UserProfile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Sign up with email and password
  const signup = async (email: string, password: string, displayName: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || "",
        displayName,
        photoURL: undefined,
        bio: "",
        followers: 0,
        following: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await setDoc(doc(db, "users", user.uid), userProfile);
      setUserProfile(userProfile);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  // Sign in with email and password
  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await fetchUserProfile(result.user.uid);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
