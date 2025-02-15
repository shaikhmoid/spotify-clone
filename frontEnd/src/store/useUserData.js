import { create } from "zustand";
import { Axios } from "../axios/axios";

const useUserData = create((set) => ({
  userData: [],
  error: null,
  fetchUserData: async () => {
    try {
      const res = await Axios.get("/auth/alluser", { withCredentials: true });
      set({ userData: res?.data?.allUser });
    } catch (error) {
      set({ error: error });
    }
  },
}));

export default useUserData;
