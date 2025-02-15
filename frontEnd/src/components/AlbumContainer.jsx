import { LibraryIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import PlaylistSkeleton from "../skeletons/PlaylistSkeleton";
import { Link } from "react-router-dom";

const AlbumContainer = ({ albumData, isLoading }) => {
  return (
    <div className="flex flex-col  mx-2 border-t-2 border-white mt-8  ">
      <div className="flex flex-shrink-0 hover:bg-zinc-600 h-10 rounded-lg items-center px-2 mt-4 hover:text-green-400 ">
        <LibraryIcon className="mr-2 size-5" />
        <span className="hidden md:inline">PlayList</span>
      </div>
      <ScrollArea className="w-full h-screen">
        {isLoading ? (
          <PlaylistSkeleton />
        ) : (
          <>
            {albumData &&
              albumData.map((items, index) => {
                return (
                  <Link key={index} to={"/album/" + items?._id}>
                    <div className="w-full mt-2">
                      <div className="flex gap-x-4 items-center rounded-lg hover:bg-zinc-600 px-2 py-2 ">
                        <img
                          src={items?.imageUrl}
                          alt=""
                          className="w-14 h-14 object-cover object-center rounded-lg "
                        />
                        <div className="flex flex-col truncate">
                          <h1>{items?.title}</h1>
                          <span>{items?.artist}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default AlbumContainer;
