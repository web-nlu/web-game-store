import { create } from 'zustand';
type UserStore = {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));