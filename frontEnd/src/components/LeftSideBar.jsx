import { HomeIcon, MessageCircle, UserCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import AlbumContainer from "./AlbumContainer";
import useAlbumAndSongStore from "../store/useAlbumAndSongStore";
import { Link } from "react-router";
import useProfileData from "../store/useProfileData";
import useToogleChatBar from "../store/useToogleChatBar";

const LeftSideBar = () => {
  const [albumData, setalbumData] = useState();
  const { profileData } = useProfileData();
  const { toogleIsChatTrue } = useToogleChatBar();

  const { error, AlbumData, fetchAlbum, isLoading } = useAlbumAndSongStore();

  // console.log(albumData, error, isLoading);
  useEffect(() => {
    fetchAlbum();
    setalbumData(AlbumData?.album);
  }, [fetchAlbum]);

  if (!AlbumData) return;

  return (
    <div className="w-full h-screen bg-zinc-800">
      <div className="w-full flex flex-col ">
        <Link to={"/"}>
          <div className="flex  rounded-lg hover:bg-zinc-600 mx-2  h-10 items-center px-2 my-1 hover:text-green-400">
            <HomeIcon />
            <span className="text-white hidden md:inline mx-2">Home</span>
          </div>
        </Link>
        {profileData && (
          <>
            <Link to={"/profile"}>
              <div className="flex  rounded-lg hover:bg-zinc-600 mx-2  h-10 items-center px-2 my-1 hover:text-green-400">
                <UserCircle />
                <span className="text-white hidden md:inline mx-2">
                  Profile
                </span>
              </div>
            </Link>
          </>
        )}
      </div>
      <AlbumContainer albumData={AlbumData?.album} isLoading={isLoading} />
    </div>
  );
};

export default LeftSideBar;
