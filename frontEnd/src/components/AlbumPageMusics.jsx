import { Music, TimerIcon } from "lucide-react";
import React from "react";
import useMusicPlayer from "../store/useMusicPlayer";

const AlbumPageMusics = ({ data }) => {
  const { currentSong, isPlaying, playAlbum, tooglePlay } = useMusicPlayer();

  const handlePlaySong = (index) => {
    if (!data) return;

    playAlbum(data?.songs, index);
  };
  return (
    <div className="w-full px-3 mt-8  ">
      <div className="flex justify-between pl-12 text-zinc-500 ">
        <h1>#Title</h1>
        <div className="flex justify-evenly w-1/2">
          <h1>Release Datae</h1>
          <h1>
            <TimerIcon />
          </h1>
        </div>
      </div>
      {data &&
        data?.songs.map((data, index) => {
          const isCurrentSong = currentSong?._id === data._id;
          return (
            // <Link to="">
            <div
              key={index}
              onClick={() => handlePlaySong(index)}
              className="flex justify-between pl-12 text-zinc-500 my-4 hover:bg-zinc-700 py-4 px-2 rounded-lg  "
            >
              <div className="flex justify-evenly  -ml-8 gap-7 items-center">
                <h1>{isCurrentSong ? <Music /> : ""}</h1>
                <div className="w-60 h-12 flex truncate">
                  <img src={data?.imageUrl} alt="music-photo" />
                  <div className="flex flex-col mx-2">
                    <h1 className="text-white text-xl">{data?.title}</h1>
                    <span>{data?.artist}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-evenly w-1/2 items-center ">
                <h1>5-ovt-2034</h1>
                <h1>0.5 </h1>
              </div>
            </div>
            // </Link>
          );
        })}
    </div>
  );
};

export default AlbumPageMusics;
