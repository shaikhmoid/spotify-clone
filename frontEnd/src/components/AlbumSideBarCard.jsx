import React from "react";

const AlbumSideBarCard = ({ items }) => {
  if (!items) {
    return;
  }

  return (
    <div className="w-full mt-2">
      <div className="flex gap-x-4 items-center rounded-lg hover:bg-zinc-600 px-2 py-2 ">
        <img
          src={items?.imageUrl}
          alt=""
          className="w-14 h-14 object-cover object-center rounded-lg "
        />
        <div className="flex flex-col text-start">
          <h1>{items?.title}</h1>
          <span>{items?.artist}</span>
        </div>
      </div>
    </div>
  );
};

export default AlbumSideBarCard;
