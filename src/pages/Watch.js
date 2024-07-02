import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import Navbar from "../components/Navbar";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../components/Spinner';
import RecommendedCard from "../components/RecommendedCard";

export default function Watch() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [videoPlaying,setVideoPlaying]=useState(false)

  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );

  const recommendedVideo = useAppSelector(
    (state) => state.youtubeApp.recommendedVideo
  );
  const nextPageToken=useAppSelector((state)=>state.youtubeApp.nextPageToken)

  useEffect(() => {
    setVideoPlaying(false)
    if (id) {
      dispatch(getVideoDetails(id));
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    setVideoPlaying(false)
    if (currentPlaying && id) dispatch(getRecommendedVideos({isNext:false,videoId:id}));
  }, [currentPlaying, id]);

  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen overflow-hidden bg-[#212121]">
          <div style={{height:"9vh"}}>
            <Navbar />
          </div>
          <div className="w-full flex" style={{height:"91vh"}}>
            <div className="w-[70%]">
              <div className="video-container w-full h-[70vh] relative">
                {
                  !videoPlaying? (
                
                <div onClick={()=>{setVideoPlaying(true)}} className="absolute flex items-center justify-center bg-cover w-full h-full cursor-pointer" id="thumbnail" style={{ backgroundImage: `url('${currentPlaying.videoThumbnail}')`, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                  <img className="w-16 h-16" src="/youtube.png"/>
                </div>
                  ):(
                <div className="iframe-container w-full h-full" id="iframe-container">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${id}?autoplay=1`} frameBorder="0" width="800" height="502" allowFullScreen title="YouTube Player" id="youtube-iframe"></iframe>
                </div>
                  )}
              </div>
            </div>
            
                <div className="w-[30%] h-[70vh]">
                {
                  recommendedVideo.length ? (
                    <div className='flex flex-col gap-3 px-2 border-l-2 border-gray-800'>
                      <InfiniteScroll
                        dataLength={recommendedVideo.length}
                        next={() => dispatch(getRecommendedVideos({isNext:true,videoId:id}))}
                        hasMore={nextPageToken!==undefined}
                        loader={<Spinner />}
                        height={600}
                      >

                        {recommendedVideo.map((item) => {
                          return (
                            <div key={item.videoId + Math.random() * 100}>
                              <RecommendedCard data={item} />
                            </div>
                          )
                        })}

                      </InfiniteScroll>
                    </div>
                  ) : (
                    <Spinner />
                  )
                }
                </div>
          </div>
        </div>
      )}
    </>
  );
}
