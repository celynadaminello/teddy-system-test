import { create } from 'zustand';

interface UserState {
  name: string | null;
  login: (name: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: null,
  login: (name) => set({ name: name }),
  logout: () => set({ name: null }),
}));