import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseRecommendedData } from "../../utils/parseRecommendedData";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  "youtube/App/getRecommendedVideos",
  async ({ isNext, videoId }, { getState }) => {
    const {
      youtubeApp: {
        nextPageToken: nextPageTokenFromState,
        recommendedVideo,
        currentPlaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState();
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/activities?&key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=videoId=${videoId}&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }&videoDuration=medium`
    );
    const items = response.data.items;
    const parsedData = await parseRecommendedData(items, videoId);

    let videos = [];
    let videosIds = [];
    parsedData.forEach((vid) => {
      if (!videosIds.includes(vid.videoId)) {
        videos.push(vid);
        videosIds.push(vid.videoId);
      }
    });

    return {
      parsedData: [...recommendedVideo, ...videos],
      nextPageToken: response.data.nextPageToken,
    };
  }
);
