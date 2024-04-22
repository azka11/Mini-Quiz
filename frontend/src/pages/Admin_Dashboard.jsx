import React, { useState, useEffect } from "react"
import Logout from "../assets/Logout.png"
import AdminSideBar from "../components/Admin_SideBar"
import Admin_Dashboard from "../assets/AdminDashboard.svg"
import Quiz from "../assets/quiz-dashboard.png"
import CategoryQuiz from "../assets/book.png"
import UserSetting from "../assets/UserSetting.png"
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { getSpecificAdmin, logoutAdmin } from "../modules/fetch/admin"
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"

function AdminDashboard() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const admin = await checkAdmin();
        setData(admin);
        
      } catch (error) {
        console.error("Error fetching data:", error.response || error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let specificAdmin;

  const checkAdmin = async () => {
    try {
      const adminToken = Cookies.get("token");
      if (!adminToken) {
        console.error("Token is missing");
        throw new Error("Unauthorized");
      }

      let decodedToken;
      try {
        decodedToken = jwtDecode(adminToken);
      } catch (error) {
        console.error("Invalid or expired token:", error);
        throw new Error("Unauthorized");
      }

      const admin = await getSpecificAdmin(decodedToken.adminId);
      specificAdmin = admin.admin;
      return specificAdmin;
    } catch (err) {
      console.error(err);
      throw new Error("Internal Server Error");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      Cookies.remove("token");
      Cookies.remove("adminId");
      Cookies.remove("currentAdmin");
      
      navigate("/login/admin");
    } catch (error) {
     console.log("Failed to fetch data :", error.massage)
    }
   };

 return (
  <div>
    <AdminSideBar />
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
                      src={Admin_Dashboard}
                      alt="user-dashboard-image"
                      className=" w-[450px]"
                    />
                  </div>
                  <h1 className="text-black font-semibold text-4xl mt-16 px-5">
                    Welcome, <span className="text-red-600">{data.name}</span></h1>
                  <p className="text-black font-normal text-lg mt-8 px-5">
                    Silakan pilih opsi disamping ini untuk beralih ke fitur yang
                    diinginkan.
                  </p>
                </div>
              </div>
              <button
                className=" bg-yellow-500 py-2 w-full rounded-3xl  hover:bg-red-800"
                onClick={handleLogout}
              >
                <div className="flex justify-center">
                <img src={Logout} className="w-8 h-8 mr-5" />
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
                  onClick={() => navigate("/admin/quiz")}
                >
                  <div className="flex justify-center">
                  <img src={Quiz} className="w-20 h-20 mr-10" />
                  <div className="grid justify-items-start">
                  <h1 className="text-white font-semibold text-3xl">
                    Create
                  </h1>
                  <h1 className="text-white font-semibold text-3xl">
                    Quiz
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
                  <img src={CategoryQuiz} className="w-20 h-20 mr-10" />
                  <div className="grid justify-items-start">
                  <h1 className="text-white font-semibold text-3xl">
                    Create
                  </h1>
                  <h1 className="text-white font-semibold text-3xl">
                    Category
                  </h1>
                  </div>
                  </div>
                </button>
              </div>
              <div>
                <button
                  className="bg-blue-400 w-full h-[210px] mt-7 rounded-3xl hover:scale-105 transition-transform "
                  onClick={() => navigate("/admin/profile")}
                >
                  <div className="flex justify-center">
                  <img src={UserSetting} className="w-20 h-20 mr-10" />
                  <div className="grid justify-items-start">
                  <h1 className="text-white font-semibold text-3xl">
                    Admin
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
          {/* <div className="col-span-1 m-10">
            <div className="bg-white w-full h-[90vh] rounded-3xl ">
              <div className="grid">
              <h1 className="text-black font-semibold text-3xl pt-4 ">
                Notification
              </h1>
              <NotificationUser/>
              </div>
            </div>
          </div> */}
        </div>
      </div>
  </div>
  </div>
 )
}

export default AdminDashboard;