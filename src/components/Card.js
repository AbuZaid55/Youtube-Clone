import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({data}) { 
  return (<>
            <Link to = {`/watch/${data.videoId}`}>
    <div className='w-64 flex gap-3 flex-col overflow-hidden'>
      <div className='relative z-10'>
            <span className='absolute bottom-8 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10'>
                {data.videoDuration}
            </span>
            <img src={data.videoThumbnail} alt='Thumbnail'className='w-full h-54 -mt-6'/>
        </div>
        <div className='flex gap-2 -mt-9 py-2 z-20 bg-[#212121]'>
            <div className='min-w-fit'>
                <img src={data.channelInfo.image} alt="channel image" className='h-8 w-8 rounded-full'/>
            </div>
            <div>
                <h3>
                    <p className='line-clamp-2'>
                        {data.videoTitle} 
                    </p>
                </h3>
                <div className='text-sm text-gray-400'>
                    <div>
                        <p className='hover:text-white'>
                            {data.channelInfo.name}
                        </p>
                    </div>
                    <div>
                        <span className="after:content-['•'] after:mx-1">
                            {data.videoViews} views
                        </span>
                        <span>
                            {data.videoAge}
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </div>
            </Link>
            </>)
}
