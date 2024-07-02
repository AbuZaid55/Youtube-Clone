import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import { clearRecommendedVideos } from "../features/youtube/youtubeSlice";
import Navbar from "../components/Navbar";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import RecommendedCard from "../components/RecommendedCard";
import { LiaThumbsUp } from "react-icons/lia";
import { LiaThumbsDownSolid } from "react-icons/lia";
import { PiShareFatLight } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { HiOutlineScissors } from "react-icons/hi2";
import { PiShareFat } from "react-icons/pi";

export default function Watch() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [desc, setDesc] = useState([]);

  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );

  const recommendedVideo = useAppSelector(
    (state) => state.youtubeApp.recommendedVideo
  );
  const nextPageToken = useAppSelector(
    (state) => state.youtubeApp.nextPageToken
  );

  useEffect(() => {
    setVideoPlaying(false);
    dispatch(clearRecommendedVideos())
    if (id) {
      dispatch(getVideoDetails(id));
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  const formatDescription = () => {
    let desc = currentPlaying.videoDescription;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    desc = desc.replace(urlRegex, function (url) {
      return `<a href="${url}" target="_blank">${url}</a>`;
    });
    desc = desc.replace(/\n/g, "<br/>");
    const paragraphs = desc
      .split("<br/><br/>")
      .map((para) => `<p>${para}</p>`)
      .join("");
    return paragraphs;
  };

  useEffect(() => {
    setVideoPlaying(false);
    if (currentPlaying && id) {
      dispatch(getRecommendedVideos({ isNext: false, videoId: id }));
      let description = formatDescription();
      setDesc(description);
    }
  }, [currentPlaying, id]);

  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen overflow-hidden bg-[#212121]">
          <div style={{ height: "9vh" }}>
            <Navbar />
          </div>
          <div className="w-full flex" style={{ height: "91vh" }}>
            <div className="w-[70%] h-full overflow-y-scroll hide-scrollbar">
              <div className="video-container w-[98%] h-[70vh] relative pl-4">
                {!videoPlaying ? (
                  <div
                    onClick={() => {
                      setVideoPlaying(true);
                    }}
                    className="absolute flex items-center justify-center bg-cover w-full h-full cursor-pointer rounded-xl"
                    id="thumbnail"
                    style={{
                      backgroundImage: `url('${currentPlaying.videoThumbnail}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <img className="w-16 h-16" alt="channel-logo" src="/youtube.png" />
                  </div>
                ) : (
                  <div
                    className="iframe-container w-full h-full"
                    id="iframe-container"
                  >
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                      frameBorder="0"
                      width="800"
                      height="502"
                      allowFullScreen
                      title="YouTube Player"
                      id="youtube-iframe"
                    ></iframe>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h1 className=" text-xl">{currentPlaying.videoTitle}</h1>
                <div className="flex items-center justify-between my-2">
                  <div className="flex items-center">
                    <img
                      src={currentPlaying.channelInfo.image}
                      alt="profile logo"
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                    <div className="ml-2">
                      <p className="text-sm">
                        {currentPlaying.channelInfo.name}
                      </p>
                      <p style={{ fontSize: "10px" }}>
                        {currentPlaying.channelInfo.subscribers} subscribers
                      </p>
                    </div>
                    <button className="bg-white text-sm text-black py-2 px-4 rounded-full ml-5">
                      Subscribe
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-zinc-700 flex items-center justify-center py-2 px-4 rounded-full gap-2">
                      <span className="flex items-center justify-center gap-2 pr-2">
                        <LiaThumbsUp className="text-xl" />
                        {currentPlaying.videoLikes}
                      </span>
                      <span className="border-l-2 pl-2">
                        <LiaThumbsDownSolid className="text-xl" />
                      </span>
                    </button>
                    <button className="bg-zinc-700 flex items-center justify-center py-2 px-4 rounded-full gap-2">
                      <PiShareFatLight className="text-xl" />
                      Share
                    </button>
                    <button className="bg-zinc-700 flex items-center justify-center py-2 px-4 rounded-full gap-2">
                      <LiaDownloadSolid className="text-xl" />
                      Download
                    </button>
                    <button className="bg-zinc-700 flex items-center justify-center py-2 px-4 rounded-full gap-2">
                      <HiOutlineScissors className="text-xl" />
                      Clip
                    </button>
                    <button className="bg-zinc-700 flex items-center justify-center py-2 px-4 rounded-full gap-2">
                      <PiShareFat className="text-xl" />
                      Save
                    </button>
                  </div>
                </div>
                <div className="bg-black p-3 mt-4 rounded-xl">
                  <p className="text-sm">
                    <span className="mr-2">
                      {currentPlaying.videoViews} views
                    </span>
                    <span>2 years ago</span>
                  </p>

                  <div
                    className="mt-3"
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                </div>
              </div>
            </div>

            <div className="w-[30%] h-[70vh]">
              {recommendedVideo.length ? (
                <div className="flex flex-col gap-3 px-2 border-l-2 border-gray-800">
                  <InfiniteScroll
                    dataLength={recommendedVideo.length}
                    next={() =>
                      dispatch(
                        getRecommendedVideos({ isNext: true, videoId: id })
                      )
                    }
                    hasMore={nextPageToken !== undefined}
                    loader={<Spinner />}
                    height={600}
                  >
                    {recommendedVideo.map((item) => {
                      return (
                        <div key={item.videoId + Math.random() * 100}>
                          <RecommendedCard data={item} />
                        </div>
                      );
                    })}
                  </InfiniteScroll>
                </div>
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
