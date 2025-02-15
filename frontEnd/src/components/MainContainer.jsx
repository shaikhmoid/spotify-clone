import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Outlet, Routes, Route } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import ChatContainer from "./ChatContainer";
import AuthPage from "./AuthPage";
import useAuthToogle from "../store/useAuthToogle";
import AudioPlayer from "./AudioPlayer";
import { PlayBackControl } from "./PlayBackControl";
import useToogleChatBar from "../store/useToogleChatBar";
const MainContainer = () => {
  const { isAuth } = useAuthToogle();
  const [isMobile, setisMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setisMobile(true);
    } else {
      setisMobile(false);
    }
  }, [window.innerWidth]);

  return (
    <>
      <div className="h-screen text-white flex flex-col">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1 flex overflow-hidden p-2"
        >
          <AudioPlayer />
          <ResizablePanel defaultSize={20} minSize={10} maxSize={15}>
            <LeftSideBar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <Outlet />
          </ResizablePanel>

          {!isMobile && (
            <ResizablePanel
              defaultSize={25}
              minSize={0}
              collapsedSize={0}
              // className="z-20 absolute right-0"
            >
              <ChatContainer />
            </ResizablePanel>
          )}
        </ResizablePanelGroup>

        {isAuth && <AuthPage />}
        <PlayBackControl />
      </div>
    </>
  );
};

export default MainContainer;
