import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";

const Login = function(){
    let [formData, setFormData] = useState({emailOrPhoneNumber: "", password: ""});
    let [register, setRegister] = useState({success: null, message: null});
    let navigate = useNavigate();
    let backend = "http://localhost:8080/api/v1";

    function registerUser(){  // Send request to backend
        axios.post(`${backend}/users/login`, {user: formData},{
            withCredentials: true // Include this line
        })  
        .then((res)=> {
            setRegister({success: res.data.success, message: res.data.message});
            removeClientMsg()
        })
        .catch((error)=> (setRegister({success: error.response.data.success, message: error.response.data.message}), removeClientMsg()))
    };

    function handleChnage(event){  // handle from input chnage
        let id = event.target.id;
        setFormData((prevObj)=>{
            return {...prevObj, [id]: event.target.value}
        });
    };

    function handleSubmit(e){  // Handle form submit
        e.preventDefault()
        registerUser()
        console.log("form sumbited", formData);
    }

    if(register.message == "User not registered"){  // If user not registered then redirect to signup page
        setTimeout(()=>{
            navigate("/signup")
        },1000)
    }
    else if(register.success){
        navigate("/dashboard")
    }

    function removeClientMsg(){  // remove client side msg
        setTimeout(()=>{
            setRegister({success: null, message: null})
        }, 2000)
    }

    const divStyle = {
        backgroundImage: `url(https://res.cloudinary.com/dk4hs2cot/image/upload/v1760427461/bzokq6izgshndwjujhzm.jpg)`,
    };

    
    //================== Login page ===================
    return(
        <div className="Login flex justify-center items-center h-dvh bg-cover" style={divStyle}>
            <div className="w-120 bg-gray-700 rounded-md">
            <form action="" onSubmit={handleSubmit}>
                <h1  className="text-2xl font-bold my-2 text-center mt-8 ">Welcome back!</h1>
                <p className="text-center text-sm text-white">We're so excited to see you agin!</p>
                <p className="text-center" style={register.success?{color: "green"}: {color: "red"}}>{register.message}</p>

                <div className="px-10 py-2">
                    <label htmlFor="emailOrPhoneNumber" className="block text-white font-semibold my-2">Email or PhoneNumber <span className="text-red-300">*</span> </label>
                    <input type="text" value={formData.emailOrPhoneNumber} onChange={(e)=> handleChnage(e)} placeholder="Email or PhoneNumber" id="emailOrPhoneNumber" className="border-1 border-blue-300 rounded-md w-full bg-gray-800 text-base font-semibold h-10 text-white pl-4" required/>
                </div>

                <div className="px-10 py-2">
                    <label htmlFor="password" className="block text-white font-semibold my-2">Password <span className="text-red-300">*</span> </label>
                    <input type="password" value={formData.password} onChange={(e)=> handleChnage(e)} placeholder="Enter your Password" id="password" className="border-1 border-blue-300 rounded-md w-full bg-gray-800 text-base font-semibold h-10 text-white pl-4" required/>
                </div>

                <div className="px-10 py-3 pb-2">
                    <button className="bg-blue-600 font-semibold w-full p-3 rounded-lg">Create Account</button>
                </div>

                 <div className="px-10 mb-8">
                    <p className="text-sm ml-2 font-semibold text-gray-400">Already have an account? <Link to="/signup" className="text-blue-500"> Register</Link></p>
                </div>
            </form>
            </div>
        </div>
    )
};


export default Login;