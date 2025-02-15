import React, { useEffect } from "react";
import useHomeSongs from "../store/useHomeSongs";
import { Link } from "react-router-dom";
import HomeSongsSkeleton from "./HomeSongsSkeleton";
import useMusicPlayer from "../store/useMusicPlayer";
import PlayButton from "./PlayButton";

const MadeForYouSongs = () => {
  const { fetchMadeForYouSongs, MadeForYouSongs, isLoading, error } =
    useHomeSongs();
  const { playAlbum } = useMusicPlayer();

  useEffect(() => {
    fetchMadeForYouSongs();
  }, [fetchMadeForYouSongs]);
  const handleCurrentSong = (index) => {
    if (!MadeForYouSongs) return;
    playAlbum(MadeForYouSongs, index);
  };
  if (isLoading) return <HomeSongsSkeleton />;
  return (
    <>
      <h1 className="my-9 text-5xl font-bold">MadeForYou Songs</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 my-4">
        {MadeForYouSongs &&
          MadeForYouSongs.map((items, index) => {
            return (
              <Link key={index} to="">
                <div
                  onClick={() => handleCurrentSong(index)}
                  className="bg-zinc-800 p-5 flex flex-col truncate gap-y-2 rounded-lg hover:bg-zinc-600 relative"
                >
                  <img
                    src={items?.imageUrl}
                    alt="img-songs"
                    className="object-center object-cover rounded-lg md:h-[250px] h-20"
                  />
                  <PlayButton song={items} />
                  <h1>{items?.title}</h1>
                  <span className="text-zinc-600">{items?.artist}</span>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default MadeForYouSongs;
