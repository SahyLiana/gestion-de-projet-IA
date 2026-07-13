import { create } from 'zustand';

export type UserRole = 'ADMIN' | 'PRODUCT_OWNER' | 'SCRUM_MASTER' | 'EQUIPIER';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: user !== null }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));