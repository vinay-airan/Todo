import React from 'react'
import { useState } from 'react'
import axios from "axios";
import Navbar from './Navbar';
import { useNavigate, Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';


function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [toggle, setToggle] = useState(0);


  const navigate = useNavigate();

  const addtodohandler = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      console.log(token);
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.post("http://localhost:8000/api/todos/", { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
      if (res.data.success) {
        alert("Todo Added Successfully");
      }


    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error adding todo");

    }
    console.log(title, description);
  }

  return (
    <>
      <div className='w-full h-screen flex flex-col bg-amber-300'>
        {toggle === 1 && (
          <div className="fixed inset-0 z-50">

            {/* FULL SCREEN BLUR */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setToggle(0)}
            ></div>

            {/* SIDEBAR */}
            <div className="relative w-[60%] h-full bg-white shadow-2xl">
              <Sidebar />
            </div>

          </div>
        )}

        <div className='w-full h-full'>

          <div className="w-full flex h-[8vh] shadow-md">
            <Navbar setToggle={setToggle} />
            <div>
              <Outlet />
            </div>
          </div>

          <div className=" flex-1 flex flex-col justify-center p-1 lg:p-2">
            <div className='flex flex-row mt-5 justify-center h-[7vh] '>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                placeholder='"add title here"'
                className='bg-black text-amber-50 cursor-text flex justify-between w-[50%] p-4 rounded'
              />
            </div>

            <div className='flex justify-center h-[70vh] mt-2'>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="type here"
                className="bg-black text-amber-50 cursor-text
              w-[50%] p-4 rounded resize-none
              wrap-break-words whitespace-pre-wrap overflow-y-auto"
              ></textarea>
            </div>

            <div className='flex  justify-center h-[7vh]'>
              <button
                onClick={addtodohandler}
                className='bg-amber-950 mt-2 text-amber-50 cursor-text flex text-xl justify-center w-[50%] p-4 rounded'
              >
                add todo
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Home;