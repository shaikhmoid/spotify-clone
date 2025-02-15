import { create } from "zustand";
import { Axios } from "../axios/axios";

const useLoginApi = create((set) => ({
  logedInUserData: [],
  error: null,
  fetchLoginData: async (password, username) => {
    try {
      const res = await Axios.post(
        "/auth/login",
        {
          password: password,
          username: username,
        },
        { withCredentials: true }
      );
      set({ logedInUserData: res });
    } catch (error) {
      set({ error });
      console.log(error);
    }
  },
}));

export default useLoginApi;
