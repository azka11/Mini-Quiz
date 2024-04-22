import React,{ useState, useEffect } from "react";
import Cookies from "js-cookie";
import UserSideBar from "../components/User_SideBar";
import { editProfile, getSpecificUser } from "../modules/fetch/user";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function UserSettingPage() {

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [userSetting, setUserSetting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    image: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await checkuser();
        setData(user);
        setFormData({
          username: user.username,
          email: user.email,
          image: user.image
        });
        setSelectedImage(`http://localhost:3000/${user.image}`)
      } catch (error) {
        console.error("Error fetching data:", error.response || error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const checkuser = async () => {
    try {
      const userToken = Cookies.get("token");
      if (!userToken) {
        console.error("Token is missing");
        throw new Error("Unauthorized");
      }

      const decodedToken = jwtDecode(userToken);

      const user = await getSpecificUser(decodedToken.userId);
      return user.user;
    } catch (err) {
      console.error(err);
      throw new Error("Internal Server Error");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const hideUserSetting = () => setUserSetting(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: image }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProfile(data.user_id, formData);
      // Jangan lupa menambahkan logika untuk menangani respons dari server setelah mengirimkan data
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

    return (
        <div className="w-screen h-screen flex overflow-hidden">
        <div className="z-50">
      <UserSideBar />
        </div>
        <div className="bg-[#ebebeb] w-screen h-screen grid grid-rows-8 grid-cols-4 pl-16 grid-flow-col">
          <div className=" border-b-2 border-gray-300 flex items-center col-span-4">
            <div className="bg-white py-3 pl-3 pr-10 rounded-[16px] drop-shadow-lg flex self-center">
              <button onClick={handleBack}>
                <ChevronLeftIcon className="w-6 h-6 mr-4 stroke-gray-400 text-gray-400 self-center" />
              </button>
              <h1 className="text-black font-semibold text-4xl">
                User Setting
              </h1>
            </div>
          </div>
          <div className="border-gray-300 border-r-2 row-span-7 h-auto my-12">
            <div className="flex justify-end m-5">
              <h1
                className={`text-black font-normal text-2xl ${
                  !userSetting ? "font-semibold" : "hover:font-medium"
                } 
                    cursor-pointer`}
                onClick={hideUserSetting}
              >
                General
              </h1>
            </div>
            <div className="flex justify-end m-5">
              <h1
                className={`text-black font-normal text-2xl ${
                  userSetting ? "font-semibold" : "hover:font-medium"
                } 
                    cursor-pointer`}
                onClick={() => setUserSetting(true)}
              >
                Security
              </h1>
            </div>
          </div>
          <div className="row-span-7 col-span-3">
            {userSetting ? (
              <div className="flex justify-start w-auto m-auto">
                <form className="mx-24 my-12">
                  <div className="grid grid-cols-2 mt-5">
                    <div className="flex justify-start col-span-2">
                      <h1 className="text-black font-semibold text-3xl">
                        Change Password
                      </h1>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 mt-5">
                    <div className="flex justify-start col-span-2">
                      <label
                        htmlFor="password"
                        className="text-black cols-span-2 italic font-light pl-2"
                      >
                        Password
                      </label>
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="rounded-xl text-black p-2 m-1 col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 mt-5">
                    <div className="flex justify-start col-span-2">
                      <label
                        htmlFor="confirm_password"
                        className="text-black cols-span-2 italic font-light pl-2"
                      >
                        Confirm Password*
                      </label>
                    </div>
                    <input
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      defaultValue=""
                      className="rounded-xl text-black p-2 m-1 col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 mt-5">
                    <div className="flex justify-start col-span-2">
                      <p className="text-black cols-span-2 italic font-light pl-2">
                        *Please re-enter your password for confirmation.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 mt-20">
                    <div className="flex justify-end col-span-2">
                      <button
                        className="bg-primary rounded-full p-3 font-semibold hover:bg-orange-400"
                        type="submit"
                      >
                        Save Change
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex justify-start mx-auto">
                <form className="mx-24 my-12" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-2 mt-4">
                    <div className="flex justify-start col-span-2">
                      <h1 className="text-black font-semibold text-3xl">
                        General Setting
                      </h1>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 mt-5">
                    <div className="flex justify-start col-span-2">
                      <label
                        htmlFor="username"
                        className="text-black cols-span-2 italic font-light pl-2"
                      >
                        Username
                      </label>
                    </div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="rounded-xl text-black p-2 m-1 col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 mt-5">
                    <div className="flex justify-start col-span-2">
                      <label
                        htmlFor="user_email"
                        className="text-black cols-span-2 italic font-light pl-2"
                      >
                        Email
                      </label>
                    </div>
                    <input
                      type="text"
                      name="user_email"
                      id="user_email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="rounded-xl text-black p-2 m-1 col-span-2"
                    />
                  </div>
                  <div className="flex items-center justify-center w-full mt-5">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    {selectedImage && (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6" style={{backgroundImage: `url(${selectedImage})`, backgroundSize: "cover", width: "100%", height: "100%"}}>
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                    )}
                    <input id="dropzone-file" type="file" className="hidden" name="image" accept="image/*" onChange={handleImageChange} />
                  </label>
                  </div>
                  <div className="grid grid-cols-2 mt-10">
                    <div className="flex justify-end col-span-2">
                      <button
                        className="bg-blue-400 rounded-full p-3 font-semibold text-white hover:bg-yellow-400"
                        type="submit"
                      >
                        Save Change
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    )
}

export default UserSettingPage