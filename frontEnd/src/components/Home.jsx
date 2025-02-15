import React from "react";
import useAuthToogle from "../store/useAuthToogle";
import FeaturedSongs from "./FeaturedSongs";
import { ScrollArea } from "./ui/scroll-area";
import MadeForYouSongs from "./MadeForYouSongs";
import TrendingSongs from "./TrendingSongs";
import useProfileData from "../store/useProfileData";
import { Axios } from "../axios/axios";
import useChatStore from "../store/useChatStore";

const Home = () => {
  const { toogleIsAuthTrue } = useAuthToogle();
  const { fetchProfileData, fetchLogout, profileData } = useProfileData();
  const { disconnectSocket } = useChatStore();

  const handleLogin = () => {
    toogleIsAuthTrue();
  };

  const handleLogout = async () => {
    try {
      await Axios.post("/auth/logout", {}, { withCredentials: true });
      fetchLogout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen px-2 py-1 ">
      <div className="w-full flex h-12 bg-zinc-800 rounded-lg justify-between items-center px-1 ">
        <img
          src="https://static.vecteezy.com/system/resources/previews/016/716/458/original/spotify-icon-free-png.png"
          alt="spotify"
          className="w-10 h-10 object-center object-cover"
        />
        {!profileData ? (
          <button
            onClick={() => handleLogin()}
            className="w-fit px-2 rounded-md  h-8 mx-2 text-center hover:bg-zinc-600 hover:text-green-600"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => handleLogout()}
            className="w-fit px-2 rounded-md  h-8 mx-2 text-center hover:bg-zinc-600 hover:text-green-600"
          >
            LogOut
          </button>
        )}
      </div>
      <div className="w-full h-5 my-2" />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <FeaturedSongs />
        <MadeForYouSongs />
        <TrendingSongs />
      </ScrollArea>
    </div>
  );
};

export default Home;
