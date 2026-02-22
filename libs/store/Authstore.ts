import { create } from "zustand";
import { encryptData, decryptData } from "../utils/cryptohelper";

interface AuthToken {
  token: string;
  expiresAt: string;
  expiresIn: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  location: string;
  role: string;
  isEmailVerified: boolean;
  isVerified: boolean;
  verificationStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  authToken: AuthToken | null;
  refreshToken: AuthToken | null;
  users: User | null;
  setAuthData: (authToken: AuthToken, refreshToken: AuthToken, user: User) => Promise<void>;
  clearAuthData: () => void;
  loadAuthData: () => Promise<void>; // Add this to load on app start
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authToken: null,
  refreshToken: null,
  users: null,

  setAuthData: async (authToken, refreshToken, users) => {
    // Update state
    set({ authToken, refreshToken, users });

    // Store in sessionStorage (encrypted)
    if (typeof window !== "undefined") {
      try {
        const encAuth = await encryptData(authToken);
        const encRefresh = await encryptData(refreshToken);
        const encUsers = await encryptData(users); // Fix: encrypt users too

        sessionStorage.setItem("authToken", encAuth);
        sessionStorage.setItem("refreshToken", encRefresh);
        sessionStorage.setItem("users", encUsers); // Fix: store encrypted users
      } catch (error) {
        console.error("Error storing auth data:", error);
      }
    }
  },

  clearAuthData: () => {
    // Clear state
    set({ authToken: null, refreshToken: null, users: null }); // Fix: clear users too
    
    // Clear sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("users"); // Fix: remove users too
    }
  },

  // Add this to load data when app starts
  loadAuthData: async () => {
    if (typeof window !== "undefined") {
      try {
        const encAuth = sessionStorage.getItem("authToken");
        const encRefresh = sessionStorage.getItem("refreshToken");
        const encUsers = sessionStorage.getItem("users");

        if (encAuth && encRefresh && encUsers) {
          const authToken = await decryptData(encAuth);
          const refreshToken = await decryptData(encRefresh);
          const users = await decryptData(encUsers);

          set({ authToken, refreshToken, users });
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      }
    }
  },
}));
