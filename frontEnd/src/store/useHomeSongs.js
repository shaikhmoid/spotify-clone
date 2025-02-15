import { create } from "zustand";
import { Axios } from "../axios/axios";

const useHomeSongs = create((set) => ({
  featuredSongsData: [],
  MadeForYouSongs: [],
  trendingSongsData: [],
  isLoading: null,
  error: null,

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await Axios.get("/songs/featured", {
        withCredentials: true,
      });
      set({ featuredSongsData: res?.data?.songs });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await Axios.get("/songs/made-for-you", {
        withCredentials: true,
      });
      set({ MadeForYouSongs: res?.data?.songs });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await Axios.get("/songs/made-for-you", {
        withCredentials: true,
      });
      set({ trendingSongsData: res?.data?.songs });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useHomeSongs;
