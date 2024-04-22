import React, { useState, useEffect } from "react"
import UserSideBar from "./components/User_SideBar"
import Logout from "./assets/Logout.png"
import UserDashboard from "./assets/UserDashboard.svg"
import Quiz from "./assets/quiz-dashboard.png"
import ViewComplain from "./assets/ViewComplain.png"
import UserSetting from "./assets/UserSetting.png"
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { getSpecificUser, logoutUser } from "./modules/fetch/user"
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"

function App() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await checkuser();
        setData(user);
        
      } catch (error) {
        console.error("Error fetching data:", error.response || error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let specificUser;

  const checkuser = async () => {
    try {
      const userToken = Cookies.get("token");
      if (!userToken) {
        console.error("Token is missing");
        throw new Error("Unauthorized");
      }

      let decodedToken;
      try {
        decodedToken = jwtDecode(userToken);
      } catch (error) {
        console.error("Invalid or expired token:", error);
        throw new Error("Unauthorized");
      }

      const user = await getSpecificUser(decodedToken.userId);
      specificUser = user.user;
      return specificUser;
    } catch (err) {
      console.error(err);
      throw new Error("Internal Server Error");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      Cookies.remove("token");
      Cookies.remove("userId");
      Cookies.remove("currentUser");
      
      navigate("/login");
    } catch (error) {
     console.log("Failed to fetch data :", error.massage)
    }
   };

 return (
  <div>
    <UserSideBar />
  <div>
    
  <div className="flex bg-[#ebebeb] px-14">
        <div className="w-screen h-screen grid grid-rows-6 grid-cols-2">
          <div className="col-span-1">
            <div className="m-10">
              <div className=" bg-white py-8 pb-16 rounded-3xl mb-9">
                <div className="flex justify-start p-4">
                  <button onClick={() => navigate(-1)}>
                    <ChevronLeftIcon className="w-6 h-6 mr-4 -mt-6 stroke-gray-400 text-gray-400 self-center" />
                  </button>
                  <h1 className="text-black font-semibold -mt-6 text-3xl">
                    Back
                  </h1>
                </div>
                <div>
                  <div className="flex justify-center">
                    <img
                      src={UserDashboard}
                      alt="user-dashboard-image"
                      className=" w-[350px]"
                    />
                  </div>
                  <h1 className="text-black font-semibold text-4xl mt-16 px-5">
                    Welcome, <span className="text-blue-600">{data.username}</span></h1>
                  <p className="text-black font-normal text-lg mt-8 px-5">
                    Silakan pilih opsi disamping ini untuk beralih ke fitur yang
                    diinginkan.
                  </p>
                </div>
              </div>
              <button
                className=" bg-yellow-500 py-3 w-full rounded-3xl  hover:bg-red-800"
                onClick={handleLogout}
              >
                <div className="flex justify-center">
                <img src={Logout} className="w-8 h-8 mr-5 mt-1" />
                <h1 className="text-white text-3xl font-semibold">Log Out</h1>
                </div>
              </button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="my-10">
              <div>
                <button
                  className="bg-blue-400 w-full h-[210px] mb-7 rounded-3xl hover:scale-105 transition-transform "
                  onClick={() => navigate("/quiz")}
                >
                  <div className="flex justify-center">
                  <img src={Quiz} className="w-20 h-20 mr-10" />
                  <div className="grid justify-items-start">
                  <h1 className="text-white font-semibold text-3xl">
                    Quiz
                  </h1>
                  <h1 className="text-white font-semibold text-3xl">
                    Select
                  </h1>
                  </div>
                  </div>
                </button>
              </div>
              <div>
                <button
                  className="bg-blue-400 w-full h-[210px] my-7 rounded-3xl hover:scale-105 transition-transform "
                  onClick={() => navigate("/404")}
                >
                  <div className="flex justify-center">
                  <img src={ViewComplain} className="w-20 h-20 mr-10" />
                  <div className="grid justify-items-start">
                  <h1 className="text-white font-semibold text-3xl">
                    View
                  </h1>
                  <h1 className="text-white font-semibold text-3xl">
                    Complaint
                  </h1>
                  </div>
                  </div>
                </button>
              </div>
              <div>
                <button
                  className="bg-blue-400 w-full h-[210px] mt-7 rounded-3xl hover:scale-105 transition-transform "
                  onClick={() => navigate("/profile")}
                >
                  <div className="flex justify-center">
                  <img src={UserSetting} className="w-20 h-20 mr-10" />
                  <div className="grid justify-items-start">
                  <h1 className="text-white font-semibold text-3xl">
                    User
                  </h1>
                  <h1 className="text-white font-semibold text-3xl">
                    Setting
                  </h1>
                  </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
 )
}
 
export default App
