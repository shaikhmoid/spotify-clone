import { Delete, LibraryIcon } from "lucide-react";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import PlaylistSkeleton from "../skeletons/PlaylistSkeleton";
import { Link } from "react-router-dom";
import { Axios } from "../axios/axios";

const AlbumList = ({ albumData, isLoading }) => {
  const handleSongDelete = async (id) => {
    try {
      await Axios.delete("/file/delete/" + id, {}, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col  mx-2 border-t-2 border-white mt-8  ">
      <div className="flex flex-shrink-0 hover:bg-zinc-600 h-10 rounded-lg items-center px-2 mt-4 hover:text-green-400 ">
        <LibraryIcon className="mr-2 size-5" />
        <span className="hidden md:inline text-white">Album</span>
      </div>
      <ScrollArea className="w-full h-screen">
        {isLoading ? (
          <PlaylistSkeleton />
        ) : (
          <>
            {albumData &&
              albumData.map((items) => {
                return (
                  <div className="w-full mt-2">
                    <div className="flex gap-x-4 items-center rounded-lg hover:bg-zinc-600 px-2 py-2 ">
                      <img
                        src={items?.imageUrl}
                        alt=""
                        className="w-14 h-14 object-cover object-center rounded-lg "
                      />
                      <div className="flex flex-col truncate text-white w-full ">
                        <h1>{items?.title}</h1>
                        <span>{items?.artist}</span>
                      </div>
                      <h1
                        className="text-red-500 text-end mr-8"
                        onClick={() => handleSongDelete(items?._id)}
                      >
                        <Delete />
                      </h1>
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default AlbumList;
