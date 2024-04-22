import React, { useEffect, useState} from 'react'
import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie';
import { getSpecificAdmin } from '../modules/fetch/admin';


const HaloAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

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

      const admin = await getSpecificAdmin(decodedToken.admin_id);
      specificAdmin = admin.admin;
      return specificAdmin;
    } catch (err) {
      console.error(err);
      throw new Error("Internal Server Error");
    }
  };
    
  return (
    <div className='p-[20px] mt-2 flex justify-center'>
      <div className='grid place-items-center'>
      <div>
        <a
          className="flex w-10 h-10 justify-center rounded-full bg-gray-800 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 border-double border-4 border-sky-500"
          style={{backgroundImage: `url(http://localhost:3000/${data.image})`, backgroundSize: "cover"}}
          >
            {/* <p className="text-white text-left pr-24 mt-1 ">{dataUser.username}</p> */}
        </a>
      </div>
        <div className=''>
        <h1 className='text-blue-800 font-semibold text-3xl'>{data.name}</h1>
        </div>
        </div>
    </div>
  )
}

export default HaloAdmin
