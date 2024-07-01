import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import Navbar from "../components/Navbar";

export default function Watch() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );

  const recommendedVideo = useAppSelector(
    (state) => state.youtubeApp.recommendedVideo
  );

  console.log(recommendedVideo)

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);
  console.log(currentPlaying)

  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen overflow-hidden">
          <div >
            <Navbar />
          </div>
          <div className="w-full flex">
            <div className="video-container w-[70%] h-[70vh] relative">
              <div className="absolute bg-cover w-full h-full hidden" id="thumbnail" style={{backgroundImage: `url('${currentPlaying.videoThumbnail}')`,backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>
              <div className="iframe-container w-full h-full" id="iframe-container">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${id}?autoplay=1`} frameborder="0" width="800" height="502" allowfullscreen title="YouTube Player" id="youtube-iframe"></iframe>
              </div>
            </div>
            <div className="min-h-[100vh] w-[30%] bg-white"></div>
          </div>
        </div>
      )}
    </>
  );
}
