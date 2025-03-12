import { create } from "zustand";

interface Template {
  id: number | string;
  user_id: number | string;
  subject: string;
  body: string;
  created_at: string;
}

interface TemplateStore {
  templates: Template[];
  setTemplates: (templates: Template[]) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  setTemplates: (templates) => set({ templates }),
}));
