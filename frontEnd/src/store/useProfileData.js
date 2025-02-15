import { create } from "zustand";


const useProfileData = create((set) => ({
  profileData: null,
  error: null,
  fetchProfileData: (data) => {
    set({ profileData: data });
  },
  fetchLogout: () => {
    set({ profileData: null });
  },
}));

export default useProfileData;
