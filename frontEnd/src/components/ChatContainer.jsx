import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HeadphonesIcon, User } from "lucide-react";
import useProfileData from "../store/useProfileData";
import useUserData from "../store/useUserData";
import useChatStore from "../store/useChatStore";
const ChatContainer = () => {
  const { profileData } = useProfileData();
  const { userData, fetchUserData } = useUserData();
  const { onlineUsers, userActivities } = useChatStore();
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (!userData) {
    return;
  }

  return (
    <div className="w-full h-screen bg-zinc-800 mx-1 my-1 bg-fixed  ">
      {!profileData ? (
        <LoginPrompt />
      ) : (
        <>
          <div className="w-full">
            <div className="flex py-4 mx-2 gap-x-2 items-center">
              <User className="size-9" />
              <h1>Is there Any One Online</h1>
            </div>
          </div>
          {userData &&
            userData.map((items, ind) => {
              const activity = userActivities.get(profileData._id);
              return (
                <div key={ind}>
                  <div className="flex mx-2 mr-3 rounded-md py-2 items-center gap-x-6  hover:bg-zinc-600 hover:text-green-500">
                    <Avatar className="ml-2">
                      <AvatarImage src={items?.imageUrl} />
                      <AvatarFallback>user</AvatarFallback>
                    </Avatar>
                    <h1 className="text-xl">{items?.username}</h1>
                    {onlineUsers.has(items._id) ? (
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    ) : (
                      "Idle"
                    )}
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default ChatContainer;

const LoginPrompt = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
    <div className="relative">
      <div
        className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse"
        aria-hidden="true"
      />
      <div className="relative bg-zinc-900 rounded-full p-4">
        <HeadphonesIcon className="size-8 text-emerald-400" />
      </div>
    </div>

    <div className="space-y-2 max-w-[250px]">
      <h3 className="text-lg font-semibold text-white">
        See What Friends Are Playing
      </h3>
      <p className="text-sm text-zinc-400">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);
