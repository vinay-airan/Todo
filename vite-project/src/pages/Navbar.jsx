import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

const Navbar = ({setToggle}) => {
  const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem("user"))?.token;


  const handlelogout = ()=>{
    localStorage.removeItem("user");
    navigate("/login");
  }
  

  return (
    <div className="w-full flex items-center justify-between px-6 py-3  bg-amber-600">
      <button onClick={()=>setToggle(1)}  className="px-6 py-3 mr-3 font-medium border rounded-lg hover:bg-gray-100">
        All Todos
      </button>
      <div className=" justify-end  px-6 py-3 ">
      {/* <button onClick={()=> navigate("/login")} className="px-4 py-2 mr-3 font-medium border rounded-lg hover:bg-gray-100">
        Login
      </button> */}
      {!token?(
        <>
        <button  onClick={()=> navigate("/login")} className="px-4 py-2 mr-3 font-medium border rounded-lg hover:bg-gray-100">
        Login
      </button>

      <button onClick={()=> navigate("/signup")} className="px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
        Signup
      </button>
      </>
      ):(
        <>

      <button  onClick={handlelogout} className="px-4 py-2 mr-3 font-medium border rounded-lg hover:bg-gray-100">
        Logout
      </button>
        </>
      )}

    </div>
    </div>

  );
};

export default Navbar;