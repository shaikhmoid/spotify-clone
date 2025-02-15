import React from "react";
import { create } from "zustand";

const useAuthToogle = create((set) => ({
  isAuth: false,

  toogleIsAuthTrue: () => {
    set({ isAuth: true });
  },

  toogleIsAuthfalse: () => {
    set({ isAuth: false });
  },
}));

export default useAuthToogle;
