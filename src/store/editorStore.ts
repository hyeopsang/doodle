import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import type {Value} from 'platejs';

interface EditorState {
  value: Value;
  setValue: (v: Value) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      value: [],
      setValue: (v) => set({value: v}),
    }),
    {
      name: 'editor-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
