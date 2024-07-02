import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import Spinner from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { clearVideos } from "../features/youtube/youtubeSlice";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import SearchCard from "../components/SearchCard";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
  const nextPageToken = useAppSelector(
    (state) => state.youtubeApp.nextPageToken
  );

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else dispatch(getSearchPageVideos(false));
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="max-h-screen overflow-hidden bg-[#212121]">
      <div style={{ height: "9vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "91vh" }}>
        <Sidebar />
        <div className="w-10/12">
          {videos.length ? (
            <div className="pl-4 flex flex-col gap-5 w-full">
              <InfiniteScroll
                dataLength={videos.length}
                next={() => dispatch(getSearchPageVideos(true))}
                hasMore={nextPageToken !== undefined}
                loader={<Spinner />}
                height={600}
              >
                {videos.map((item) => {
                  return (
                    <div
                      className="my-5"
                      key={item.videoId + Math.random() * 100}
                    >
                      <SearchCard data={item} />
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
  );
}
