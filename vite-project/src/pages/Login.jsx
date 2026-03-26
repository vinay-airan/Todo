import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


const Login = () => {


    const navigate = useNavigate();
    const loginhandler = async () => {
        try {
            if (!email || !password) {
                toast.error("please enter email or password");
                return;
            }
            const res = await axios.post("http://localhost:8000/api/users/login", { email, password }, { withCredentials: true });
            console.log(res.data);
            toast.success("Login Successful");
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
            console.log("AFTER SAVE:", localStorage.getItem("user"));
        } catch (error) {
            console.log(error.message);
            toast.message(error.message, "login failed")
        }
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <div className="w-full flex justify-center text-3xl items-center px-6 py-4.5  bg-amber-600">
                Welcome to my Todo App
            </div>
            <div className='bg-amber-300   flex flex-col justify-center p-1 lg:p-2 h-[92vh] '>
                {/* <div className=' flex flex-row mt-5 justify-center h-[7vh] '>
                    <input value={fullname} onChange={(e)=>setFullname(e.target.value)} type='text' placeholder='email' className='bg-black text-amber-50 cursor-text   flex justify-between  w-[50%] p-4  rounded' ></input>
                </div> */}
                <div className=' flex flex-row mt-5 justify-center h-[7vh] '>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='email' className='bg-black text-amber-50 cursor-text   flex justify-between  w-[50%] p-4  rounded' ></input>
                </div>
                <div className='flex justify-center  h-[7vh]   mt-2 '>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='bg-black text-amber-50 cursor-text   flex justify-between  w-[50%] p-4  rounded'></input>
                </div>
                <div className='flex justify-center h-[7vh]'>
                    <button onClick={loginhandler} className='bg-amber-950 hover:bg-amber-900 mt-2 text-amber-50 cursor-text sm:text-xl   flex text-[20px]  justify-center  w-[50%] p-4  rounded'>login</button>
                </div>
                <div className='flex justify-center h-[7vh]'>
                    <button onClick={() => navigate("/signup")} className='bg-amber-950 hover:bg-amber-900 mt-2 text-amber-50 cursor-text sm:text-xl   flex text-[20px]  justify-center  w-[50%] p-4  rounded'>
                        Signup
                    </button>
                </div>

            </div>
        </div>
    )

}

export default Login;