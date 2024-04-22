import React, { useState } from 'react';
import Cookies from "js-cookie";
import { PlayIcon, PowerIcon } from "@heroicons/react/24/solid"
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../modules/fetch/user';
import home from '../assets/home.png'
import profile from '../assets/user.png'
import quiz from '../assets/quiz.png'
import HaloUser from './HaloUser';

function UserSideBar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
          await logoutUser();
          Cookies.remove("token");
          Cookies.remove("userId");
          Cookies.remove("currentUser");
          // localStorage.removeItem("token");
          
          navigate("/login");
        } catch (error) {
         console.log("Failed to fetch data :", error.massage)
        }
       };

    const linkTitles = [
        "Home",
        "Quiz",
        "Profile",
      ];
      const links = [
        "/",
        "/quiz",
        "/profile",
      ];

    const image = [home, quiz, profile];
  
    const numOfLinks = 3;
    
    const truncatedImage = image.slice(0, numOfLinks);
    const truncatedTitles = linkTitles.slice(0, numOfLinks);
    const truncatedLinks = links.slice(0, numOfLinks);
  
    return (
        <>
        <div>
          <button
            onClick={toggleSidebar}
            className="w-[50px] h-[200px] mt-[50px] absolute bg-blue-400 cursor-pointer rounded-r-3xl"
          ></button>
        </div>
        <div
          className={
            isOpen
              ? "w-[100%] h-screen bg-black/30 absolute overflow-hidden"
              : "hidden"
          }
        >
          <div
            className={
              isOpen
                ? " bg-yellow-500 absolute backdrop-blur-md w-[300px] h-screen animate-in slide-in-from-left"
                : "hidden"
            } 
          >
            <button
              onClick={toggleSidebar}
              className="ml-[300px] mt-[50px] w-[50px] h-[200px] absolute bg-blue-400 cursor-pointer rounded-r-3xl"
            ></button>
            <HaloUser />
            <div className="flex flex-col justify-between">
              <hr className="border mx-4 border-gray-300" />
              <div className="bg-blue-400 mt-6 h-52 pb-2 rounded-xl mx-6 drop-shadow-xl">
                <h2 className="text-start ml-5 pt-4 mb-2 font-bold">Dashboard Menu</h2>
                <ul>
                  {truncatedTitles.map((title, index) => (
                    <li key={index}>
                      <a href={truncatedLinks[index]}>
                        <button
                          className="text-white 
                  text-start
                  w-[300px]
                  h-[50px]
                  hover:border-l-4
                  "
                        >
                          <div className="flex justify-start">
                            <div className="grid place-items-center">
                              <img
                                src={truncatedImage[index]}
                                className="w-6 h-6 mx-4"
                              />
                            </div>
                            <h1 className=" text-lg">{title}</h1>
                          </div>
                        </button>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border mx-4 border-gray-300 mt-8"></div>
              <div className="pl-5 bg-slate-300 rounded-xl max-h-[350px] h-[320px] mx-6 mt-6">
                <h2 className="text-start text-blue-600 pt-4 font-bold">
                  Notification
                </h2>
              </div>
              <div className="pr-5 mt-6 flex justify-end">
                <h2 className="text-start text-blue-800 mx-2 font-base h-[275px] cursor-pointer" onClick={handleLogout}>
                  Logout
                </h2>
                <PowerIcon className="text-blue-600 stroke-blue-600 stroke-2 w-6 h-6 cursor-pointer" onClick={handleLogout} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default UserSideBar;