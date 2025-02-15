import { Delete, Music, TimerIcon } from "lucide-react";
import React from "react";
import { Axios } from "../axios/axios";

const SongsList = ({ data }) => {
  const handleSongDelete = async (id) => {
    try {
      await Axios.delete(
        "/file/deleteSong/" + id,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-3 mt-8 overflow-y-scroll h-96">
      <div className="flex justify-between pl-12 text-zinc-500 ">
        <h1>#Title</h1>
        <div className="flex justify-evenly w-1/2">
          <h1>Release Datae</h1>
          <h1>
            <TimerIcon />
          </h1>
        </div>
      </div>
      {data &&
        data.map((data, index) => {
          return (
            // <Link to="">
            <div className="flex justify-between pl-12 text-zinc-500 my-4 hover:bg-zinc-700 py-4 px-2 rounded-lg  ">
              <div className="flex justify-evenly  -ml-8 gap-7 items-center">
                <h1
                  onClick={() => handleSongDelete(data._id)}
                  className="text-red-500 size-9 "
                >
                  {" "}
                  <Delete />
                </h1>
                <div className="w-60 h-12 flex truncate">
                  <img src={data?.imageUrl} alt="music-photo" />
                  <div className="flex flex-col mx-2">
                    <h1 className="text-white text-xl">{data?.title}</h1>
                    <span>{data?.artist}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-evenly w-1/2 items-center ">
                <h1>5-ovt-2034</h1>
                <h1>0.5 </h1>
              </div>
            </div>
            // </Link>
          );
        })}
    </div>
  );
};

export default SongsList;
