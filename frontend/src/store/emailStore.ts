import { create } from "zustand";

interface SubjectStore {
  subject: string;
  setSubject: (subject: string) => void;
}

interface BodyStore {
  body: string;
  setBody: (body: string) => void;
}

export const useSubjectStore = create<SubjectStore>((set) => ({
  subject: "",
  setSubject: (subject) => set({ subject }),
}));

export const useBodyStore = create<BodyStore>((set) => ({
  body: "",
  setBody: (body) => set({ body }),
}));
