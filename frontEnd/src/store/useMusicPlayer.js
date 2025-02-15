import { create } from "zustand";

const useMusicPlayer = create((set, get) => ({
  currentIndex: -1,
  isPlaying: false,
  currentSong: null,
  queue: [],

  initializeQueue: (song) => {
    set({
      currentSong: get().currentSong || song[0],
      queue: song,
      currentIndex: currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  playAlbum: (songs, index) => {
    if (songs.length === 0) return;

    const Song = songs[index];

    set({
      queue: songs,
      currentIndex: index,
      currentSong: Song,
      isPlaying: true,
    });
  },

  setCurrentSong: (song) => {
    if (!song) return;
    const startIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentIndex: startIndex !== -1 ? startIndex : get().currentIndex,
      currentSong: song,
      isPlaying: true,
    });
  },

  tooglePlay: () => {
    const willStartPlaying = !get().isPlaying;

    set({
      isPlaying: willStartPlaying,
    });
  },

  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },

  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },
}));

export default useMusicPlayer;
