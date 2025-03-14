import { create } from "zustand";

interface Template {
  id: number;
  subject: string;
  name: string;
  body: string;
  last_date: string;
}

interface TemplateStore {
  templates: Template[];
  setTemplates: (templates: Template[]) => void;
  deleteTemplate: (id: number) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  setTemplates: (templates) => set({ templates }),
  deleteTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((template) => template.id !== id),
    })),
}));
