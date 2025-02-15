import React, { useEffect, useRef } from "react";
import useMusicPlayer from "../store/useMusicPlayer";

const AudioPlayer = () => {
  const audioRef = useRef();
  const prevSongRef = useRef();
  const { currentSong, isPlaying, playNext } = useMusicPlayer();

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnd = () => {
      playNext();
    };
    audio?.addEventListener("ended", handleEnd);

    return () => audio.removeEventListener("ended", handleEnd);
  }, [playNext]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      audio.currentTime = 0;

      prevSongRef.current = currentSong?.audioUrl;

      if (isPlaying) audio.play();
    }
  }, [isPlaying, currentSong]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
