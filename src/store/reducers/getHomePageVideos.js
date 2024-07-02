import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "youtube/App/searchPageVideos",
  async (isNext, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState();

    try {
      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search`,
        {
          params: {
            maxResults: 20,
            q: "",
            key: API_KEY,
            part: "snippet",
            type: "video",
            pageToken: isNext ? nextPageTokenFromState : "",
            videoDuration: "medium",
          },
        }
      );
      const items = response.data.items;
      const parsedData = await parseData(items);

      return {
        parsedData: [...videos, ...parsedData],
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      throw error;
    }
  }
);
