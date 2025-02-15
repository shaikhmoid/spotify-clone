import React, { useEffect } from "react";
import useHomeSongs from "../store/useHomeSongs";
import { Link } from "react-router-dom";
import HomeSongsSkeleton from "./HomeSongsSkeleton";

import PlayButton from "./PlayButton";
import useMusicPlayer from "../store/useMusicPlayer";

const FeaturedSongs = () => {
  const { fetchFeaturedSongs, isLoading, featuredSongsData, error } =
    useHomeSongs();
  const { playAlbum } = useMusicPlayer();

  useEffect(() => {
    fetchFeaturedSongs();
  }, [fetchFeaturedSongs]);
  const handleCurrentSong = (index) => {
    if (!featuredSongsData) return;

    playAlbum(featuredSongsData, index);
  };
  if (isLoading) return <HomeSongsSkeleton />;
  return (
    <>
      <h1 className="my-9 text-5xl font-bold">Featured Songs</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 my-4">
        {featuredSongsData &&
          featuredSongsData.map((items, index) => {
            return (
              <Link key={index} to="">
                <div
                  onClick={() => {
                    handleCurrentSong(index);
                  }}
                  className="bg-zinc-800 p-5 flex flex-col truncate gap-y-2 rounded-lg hover:bg-zinc-600 relative"
                >
                  <img
                    src={items?.imageUrl}
                    alt="img-songs"
                    className="object-center object-cover rounded-lg relative md:h-[250px] h-20"
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

export default FeaturedSongs;
