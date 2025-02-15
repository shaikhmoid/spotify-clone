import { PauseCircle, PlayIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import AlbumPageMusics from "./AlbumPageMusics";
import useAlbumAndSongStore from "../store/useAlbumAndSongStore";
import { useParams } from "react-router-dom";
import useMusicPlayer from "../store/useMusicPlayer";

const AlbumPage = () => {
  const [songData, setsongData] = useState();

  const params = useParams();
  const { songsData, error, fetchSongs, isLoading } = useAlbumAndSongStore();
  const { currentSong, isPlaying, playAlbum, tooglePlay } = useMusicPlayer();
  const handlePlayPause = () => {
    tooglePlay();
  };

  useEffect(() => {
    if (params.id) {
      fetchSongs(params.id);
    }
    setsongData(songsData?.data?.album);
  }, [fetchSongs, params.id]);
  if (!songsData) return;
  return (
    <div className="w-full h-screen">
      <div className="w-full min-h-screen relative">
        <div className="absolute bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-bg-zinc-900 size-full rounded-md">
          <div className="absolute top-0 left-0 md:w-full  flex ">
            <div className="md:w-[600px] md:block  hidden h-96  ml-10">
              <img
                src={songsData?.data?.album.imageUrl}
                alt="album-page"
                className="size-full object-cover object-center"
              />
            </div>
            <div className="relative w-full">
              <div className="absolute md:top-48 top-32 ml-4">
                <h1 className="text-xl font-bold">Album</h1>
                <h1 className="capitalize md:text-8xl font-bold text-7xl">
                  {songsData?.data?.album.title}
                </h1>
                <div className="flex mt-9 items-center gap-x-3">
                  <h1 className="font-bold text-2xl">
                    {songsData?.data?.album?.artist}
                  </h1>
                  <span>{songsData?.data?.album?.songs.length} Songs</span>
                  <span>2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute md:top-[450px] top-[420px] w-full">
          <div
            onClick={handlePlayPause}
            className="bg-green-500 w-20 h-20 content-center text-white pl-7 rounded-full ml-5 "
          >
            {isPlaying &&
            songsData?.data?.album.songs.some(
              (song) => song._id === currentSong?._id
            ) ? (
              <PauseCircle className="text-3xl" />
            ) : (
              <PlayIcon className="text-3xl" />
            )}
          </div>
          <div className="overflow-auto h-36">
            <AlbumPageMusics data={songsData?.data?.album} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
