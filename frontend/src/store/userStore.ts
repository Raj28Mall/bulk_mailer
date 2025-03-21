import { create } from "zustand";

interface User{
    name:string;
    email:string;
    picture:string;
}

interface UserStore{
    user:User;
    setUser:(user:User)=>void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: { name: "John Doe", email: "john.doe@gmail.com", picture: "" }, 
    setUser: (user) => set({ user }),
  }));