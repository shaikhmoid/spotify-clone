import { Axios } from "../axios/axios";
import { create } from "zustand";
const useAlbumAndSongStore = create((set) => ({
  songs: [],
  album: [],
  isLoading: null,
  error: null,
  AlbumData: [],
  songsData: [],
  allSongsData: [],

  fetchAlbum: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await Axios.get("/album/all", {
        withCredentials: true,
      });
      set({ AlbumData: res?.data });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAllSongs: async () => {
    set({ isLoading: true });
    try {
      const res = await Axios.get(`/songs/all`, {
        withCredentials: true,
      });
      set({ allSongsData: res?.data?.song });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSongs: async (id) => {
    set({ isLoading: true });
    try {
      const res = await Axios.get(`/album/${id}`, {
        withCredentials: true,
      });
      set({ songsData: res });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAlbumAndSongStore;
