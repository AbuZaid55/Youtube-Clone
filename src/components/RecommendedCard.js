import React from "react";
import { Link } from "react-router-dom";

export default function RecommendedCard({ data }) {
  return (
    <Link to={`/watch/${data.videoId}`}>
      <div className="flex h-28 gap-3 mb-2">
        <div className="relative w-[40%] overflow-hidden ">
          <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
            {data.videoDuration}
          </span>

          <img
            src={data.videoThumbnail}
            alt="Thumbnail"
            className="h-32 w-full"
          />
        </div>
        <div className="flex gap-1 flex-col w-[60%]">
          <h3 className="max-w-2xl">
            <p className="line-clamp-2">{data.videoTitle}</p>
          </h3>
          <div className="text-xs text-gray-400">
            <div>
              <div>
                <span className="after:contents-['•'] after:mx-1">
                  {data.videoViews} views
                </span>
                <span>{data.videoAge}</span>
              </div>
            </div>
          </div>
          <div className="min-w-fit">
            <p className="flex items-center gap-2 text-xs text-gray-400">
              <img
                src={data.channelInfo.image}
                alt="channel"
                className="h-9 w-9 rounded-full"
              />
              <span>{data.channelInfo.name}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
