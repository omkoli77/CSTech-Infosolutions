import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";

const Signup = function(){
    let [formData, setFormData] = useState({email: "",  name: "", phoneNumber: "", password: ""});
    let [register, setRegister] = useState({success: null, message: null});
    let navigate = useNavigate()
    let backend = "https://cstech-infosolutions-1.onrender.com//api/v1";

    if(register.message == "User all ready exsist"){  // If user registered then redirect to login page
        setTimeout(()=>{
            navigate("/login")
        },1000)
    }
    else if(register.success){
        navigate("/dashboard")
    }

    function handleChnage(event){  // handle input change
        let id = event.target.id;
        setFormData((prevObj)=>{
            return {...prevObj, [id]: event.target.value}
        });
    };

    function removeClientMsg(){  // remove client side msg
        setTimeout(()=>{
            setRegister({success: null, message: null})
        }, 2000)
    }

    function registerUser(){  // Send request to backend
        axios.post(`${backend}/users/register`, {user: formData}, {withCredentials: true})  
        .then((res)=> (setRegister({success: res.data.success, message: res.data.message}), removeClientMsg()))
        .catch((error)=> (setRegister({success: error.response.data.success, message: error.response.data.message}), removeClientMsg()))
    };

    function handleSubmit(e){  // Handle form submit
        e.preventDefault()
        registerUser()
        console.log("form sumbited")
    }

    const divStyle = {
        backgroundImage: `url(https://res.cloudinary.com/dk4hs2cot/image/upload/v1760427461/bzokq6izgshndwjujhzm.jpg)`,
    };


    //=================== Signup page ==================
    return(
        <div className="Signup flex justify-center items-center h-dvh bg-cover" style={divStyle}>
            <div className="w-120 bg-gray-700 rounded-md">
            <form onSubmit={handleSubmit}>
                <h1  className="text-2xl font-bold my-2 text-center text-white">Create an account</h1>
                <p className="text-center" style={register.success?{color: "green"}: {color: "red"}}>{register.message}</p>

                <div className="px-10 py-2">
                    <label htmlFor="email" className="block text-white font-semibold my-2">Email <span className="text-red-300">*</span> </label>
                    <input type="text" value={formData.email} onChange={(e)=> handleChnage(e)} placeholder="Enter your email" id="email" className="border-1 border-blue-300 rounded-md w-full bg-gray-800 text-base font-semibold h-10 text-white pl-4" required/>
                </div>

                <div className="px-10 py-2">
                    <label htmlFor="name" className="block text-white font-semibold my-2">Name <span className="text-red-300">*</span> </label>
                    <input type="text" value={formData.name} onChange={(e)=> handleChnage(e)} placeholder="Enter your Name" id="name" className="border-1 border-blue-300 rounded-md w-full bg-gray-800 text-base font-semibold h-10 text-white pl-4" required/>
                </div>

                <div className="px-10 py-2">
                    <label htmlFor="phoneNumber" className="block text-white font-semibold my-2">phoneNumber <span className="text-red-300">*</span> </label>
                    <input type="number" value={formData.phoneNumber} onChange={(e)=> handleChnage(e)} placeholder="91+76663456896" id="phoneNumber" className="border-1 border-blue-300 rounded-md w-full bg-gray-800 text-base font-semibold h-10 text-white pl-4" required/>
                </div>

                <div className="px-10 py-2">
                    <label htmlFor="password" className="block text-white font-semibold my-2">Password <span className="text-red-300">*</span> </label>
                    <input type="password" value={formData.password} onChange={(e)=> handleChnage(e)} placeholder="Enter your Password" id="password" className="border-1 border-blue-300 rounded-md w-full bg-gray-800 text-base font-semibold h-10 text-white pl-4" required/>
                </div>

                <div className="px-10 py-3 pb-2">
                    <button className="bg-blue-600 font-semibold w-full p-3 rounded-lg">Create Account</button>
                </div>

                 <div className="px-10 mb-8">
                    <Link to="/login" className="text-sm ml-2 font-semibold text-blue-500">Already have an account? Login</Link>
                </div>
            </form>
            </div>
        </div>
    )
};


export default Signup;