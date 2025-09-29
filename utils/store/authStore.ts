import { create } from "zustand";

interface AuthState {
  role: "USER" | "COACH" | "ADMIN" | null;
  setRole: (role: "USER" | "COACH" | "ADMIN" | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
