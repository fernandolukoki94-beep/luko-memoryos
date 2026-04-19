import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile } from "@/lib/types";

interface AuthContextType {
  currentUser: any | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("luko_user");
    const storedProfile = localStorage.getItem("luko_profile");

    if (storedUser && storedProfile) {
      setCurrentUser(JSON.parse(storedUser));
      setUserProfile(JSON.parse(storedProfile));
    }

    setLoading(false);
  }, []);

  // Sign up with email and password
  const signup = async (email: string, password: string, displayName: string) => {
    // Validate inputs
    if (!email || !password || !displayName) {
      throw new Error("Por favor, preenche todos os campos");
    }

    if (password.length < 6) {
      throw new Error("A palavra-passe deve ter pelo menos 6 caracteres");
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("luko_users") || "[]");
    if (existingUsers.some((u: any) => u.email === email)) {
      throw new Error("Este email já está registado");
    }

    // Create new user
    const newUser = {
      uid: `user_${Date.now()}`,
      email,
      password, // In production, this should be hashed
    };

    const newProfile: UserProfile = {
      uid: newUser.uid,
      email,
      displayName,
      photoURL: `https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-profile-avatar-FFCeRVUABGq3ckRYJf7PsM.webp`,
      bio: "",
      followers: 0,
      following: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Store user and profile
    existingUsers.push(newUser);
    localStorage.setItem("luko_users", JSON.stringify(existingUsers));
    localStorage.setItem("luko_user", JSON.stringify(newUser));
    localStorage.setItem("luko_profile", JSON.stringify(newProfile));

    setCurrentUser(newUser);
    setUserProfile(newProfile);
  };

  // Sign in with email and password
  const login = async (email: string, password: string) => {
    // Validate inputs
    if (!email || !password) {
      throw new Error("Por favor, preenche email e palavra-passe");
    }

    // Find user
    const users = JSON.parse(localStorage.getItem("luko_users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Email ou palavra-passe incorretos");
    }

    // Load user profile
    const profiles = JSON.parse(localStorage.getItem("luko_profiles") || "{}");
    const profile = profiles[user.uid] || {
      uid: user.uid,
      email: user.email,
      displayName: "Utilizador",
      photoURL: `https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-profile-avatar-FFCeRVUABGq3ckRYJf7PsM.webp`,
      bio: "",
      followers: 0,
      following: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    localStorage.setItem("luko_user", JSON.stringify(user));
    localStorage.setItem("luko_profile", JSON.stringify(profile));

    setCurrentUser(user);
    setUserProfile(profile);
  };

  // Sign out
  const logout = async () => {
    localStorage.removeItem("luko_user");
    localStorage.removeItem("luko_profile");
    setCurrentUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
