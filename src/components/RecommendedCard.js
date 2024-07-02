import React from "react";
import { Link } from "react-router-dom";

export default function RecommendedCard({ data }) {
  return (
    <Link to={`/watch/${data.videoId}`}>
      <div className="flex gap-3 ">
        <div className="relative h-28 w-[40%]">
          <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
            {data.videoDuration}
          </span>

          <img
            src={data.videoThumbnail}
            alt="Thumbnail"
            className="h-full w-full"
          />
        </div>
        <div className="flex gap-1 flex-col w-[60%]">
          <h3 className="max-w-2xl">
            <a href="#" className="line-clamp-2">
              {data.videoTitle}
            </a>
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
          <div className="min-w-fit my-2">
            <a
              href="#"
              className="flex items-center gap-2 text-xs text-gray-400"
            >
              <img
                src={data.channelInfo.image}
                alt="channel"
                className="h-9 w-9 rounded-full"
              />
              <span>{data.channelInfo.name}</span>
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}
