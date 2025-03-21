import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LogStore {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useLogStore = create<LogStore>()(
  persist(
    (set) => ({
      loggedIn: false,
      setLoggedIn: (loggedIn) => set({ loggedIn }),
    }),
    { name: "user-storage" }
  )
);

