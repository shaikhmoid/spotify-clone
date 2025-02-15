import { create } from "zustand";

const useToogleChatBar = create((set) => ({
  isChat: false,

  toogleIsChatTrue: () => {
    set({ isChat: true });
  },

  toogleIsChatfalse: () => {
    set({ isChat: false });
  },
}));

export default useToogleChatBar;
