import React, { useEffect } from "react";
import { RxHamburgerMenu  } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { changeSearchTerm, clearVideos } from "../features/youtube/youtubeSlice";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  const handleSearch = () => {
    if (location.pathname !== "/search") navigate("/search");
    else {
      dispatch(clearVideos);
      dispatch(getSearchPageVideos(false));
    }
  };

  useEffect(()=>{
    if(location.pathname==="/"){
      dispatch(changeSearchTerm(''))
    }
  },[location])


  return (
    <div className="flex justify-between items-center px-8 h-full  bg-[#212121] opacity-95 sticky top-0 z-50">
      <div className="flex gap-6 items-center text-2xl">
        <div className="cursor-pointer">
          <RxHamburgerMenu  />
        </div>
          <Link to="/">
        <div className="flex gap-1 items-center justify-center">
          <img className="w-8 h-8" src="/youtube.png"/>
          <span className="text-2xl">Youtube</span>
        </div>
          </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-3xl border-2 border-gray-700">
            <div className="flex gap-5 items-center pr-5">
              <input
                type="text"
                placeholder="Search"
                className="w-96 bg-zinc-900 focus:outline-none border-none"
                value={searchTerm}
                onChange={e=>dispatch(changeSearchTerm(e.target.value))}
              />
            </div>
            <button className="h-10 w-16 flex items-center justify-center bg-zinc-700 rounded-r-3xl border-2 border-gray-700 border-r-0">
              <AiOutlineSearch className="text-xl " />
            </button>
          </div>
        </form>

        <div className="text-xl p-3 bg-zinc-700 rounded-full">
          <FaMicrophone />
        </div>
      </div>
      <div className="flex gap-8 items-center text-xl">
        <RiVideoAddLine />
        <div className="relative">
          <BsBell />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
            {" "}
            9+{" "}
          </span>
        </div>
        <img
          src="/AbuZaid.jpg"
          alt="profile logo"
          className="w-9 h-9 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
}
