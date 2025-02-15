import React, { useEffect, useRef, useState } from "react";
import SongsList from "./SongsList";
import useAlbumAndSongStore from "../store/useAlbumAndSongStore";
import AlbumList from "./AlbumList";
import AddData from "./AddData";
import AddAlbumData from "./AddAlbumData";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { allSongsData, isLoading, fetchAllSongs } = useAlbumAndSongStore();
  const { error, AlbumData, fetchAlbum } = useAlbumAndSongStore();
  const [showData, setshowData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllSongs();
    fetchAlbum();
  }, [fetchAllSongs, fetchAlbum]);

  const songsRef = useRef();
  const AlbumRef = useRef();
  const handleSongsList = () => {
    setshowData(true);
  };
  const handleAlbum = () => {
    setshowData(false);
  };

  if (!AlbumData) return;
  return (
    <div className="h-full w-full">
      <div className="w-full bg-zinc-800 my-2 mx-2 ml-2 py-4 px-2">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex justify-center items-center cursor-pointer"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/716/458/original/spotify-icon-free-png.png"
            alt="spotify-profile"
            className="object-cover object-center w-28 h-28 "
          />
          <h1 className="text-5xl text-white text-center mx-2 font-bold">
            Spotify
          </h1>
        </div>
      </div>
      <div className="w-full  mx-3 my-2 flex justify-between">
        <div className="flex gap-x-4  px-2 py-2 ">
          <button
            onClick={handleSongsList}
            ref={songsRef}
            className={`w-16 h-9 ${
              showData ? `bg-green-500` : `bg-zinc-800`
            } rounded-md font-semibold`}
          >
            Songs
          </button>
          <button
            onClick={handleAlbum}
            ref={AlbumRef}
            className={`w-16 h-9 ${
              !showData ? `bg-green-500` : `bg-zinc-600`
            } rounded-md font-semibold`}
          >
            Albums
          </button>
        </div>
        <div className="py-2 px-2 ">
          <button>{showData ? <AddData /> : <AddAlbumData />}</button>
        </div>
      </div>
      {showData ? (
        <SongsList data={allSongsData} />
      ) : (
        <AlbumList albumData={AlbumData?.album} isLoading={isLoading} />
      )}
    </div>
  );
};

export default Profile;
