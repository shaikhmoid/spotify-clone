import { Route, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import AlbumPage from "./components/AlbumPage";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import useProfileData from "./store/useProfileData";
import { useEffect } from "react";
import { Axios } from "./axios/axios";
import useChatStore from "./store/useChatStore";

function App() {
  const { profileData, fetchProfileData } = useProfileData();
  const { initSocket, onlineUsers, selectedUser } = useChatStore();

  const getProfileData = async () => {
    try {
      const res = await Axios.get("/auth/user", { withCredentials: true });
      fetchProfileData(res?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!profileData) {
      getProfileData();
    }
    return () => {};
  }, [fetchProfileData]);

  useEffect(() => {
    if (!profileData) return;
    initSocket(profileData._id);
  }, [initSocket, profileData, selectedUser]);

  return (
    <div className="h-screen w-full relative  ">
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<MainContainer />}>
          <Route path="/" element={<Home />} />
          <Route path="/album/:id" element={<AlbumPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
