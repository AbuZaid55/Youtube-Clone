import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {useAppDispatch,useAppSelector} from "../hooks/useApp";
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';
import Spinner from '../components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';

export default function Home() {

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state)=> state.youtubeApp.videos);

  useEffect(()=>{
    dispatch(getHomePageVideos(false));
  },[dispatch])


  return (
    <div className='max-h-screen overflow-hidden'>
      <div style={{height:"9vh"}}>
      <Navbar/>
      </div>
      <div className='flex' style={{height:"91vh"}}>
      <Sidebar/>
      <div className='w-10/12'>
      {
        videos.length ? (
          <InfiniteScroll 
          dataLength={videos.length} 
          next={()=> dispatch(getHomePageVideos(true))}
          hasMore={videos.length<500}
          loader={<Spinner/>}
          height={650}
          >
              <div className='grid gap-8 grid-cols-4 py-4 pr-6 pl-2 bg-[#212121] w-full'>
                {videos.map((item) => {
                  return <Card data={item} key={item.videoId+Math.random()*100}/>
                })}
              </div>
          </InfiniteScroll>
        ):(
          <Spinner/>
        )
      }
      </div>
      </div>
    </div>
  )
}
