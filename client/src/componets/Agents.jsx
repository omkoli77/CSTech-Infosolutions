import axios from "axios";
import { useState } from "react"

export const Agents = ({initialData, setInitailData, fetchDashboardData, setRegister, removeClientMsg}) => {
    let [formData, setFormData] = useState({name: "", email: "", phoneNumber: "", password: ""});
    let backend = "http://localhost:8080/api/v1/agents";
    console.log("Agents component rendered")

    function handleChnage(e){  // handle form change
        let {name, value} = e.target;
        setFormData((prevObj)=>{
            return {...prevObj, [name]: value}
        });
    };

    function submitForm(){
        console.log(formData);
        axios.post(`${backend}/register`, {user: formData}, {withCredentials: true})
        .then((res)=> {
            console.log("agent registere successfull", res)
            setRegister({success: res.data.success, message: res.data.message})
            removeClientMsg()
            setInitailData((prevObj)=>{
                return {...prevObj , totalAgent: prevObj.totalAgent+1}
            })
        })
        .catch((error)=> {
            console.log("agent not registered", error)
            setRegister({success: error.response.data.success, message: error.response.data.message})
            removeClientMsg()
        })
        setFormData({name: "", email: "", phoneNumber: "", password: ""});
    };

    return (
        <div className="Agent bg-gray-800 m-4 my-8 rounded-md"> 
        <div className="navbar justify-between ">
            <h1 className="text-xl font-semibold ml-5">Agents</h1>
            <button onClick={submitForm} className="bg-blue-500 font-semibold w-30 p-2 rounded-lg m-5 text-white">Add Agent</button>
        </div>

        <form action="" className="flex pb-6">
            <div className="text-center w-75 ">
                <label htmlFor="name" className="block text-lg font-medium">Name</label>
                <hr className="my-2 border-gray-400 border-1 " />
                <input type="text" onChange={handleChnage} value={formData.name} name="name" id="name" placeholder="Rahul Mahale" className="text-center text-sm font-medium border-none focus:outline-none" />
            </div>

            <div className="text-center w-75">
                <label htmlFor="email" className="block text-lg font-medium">Email</label>
                <hr className="my-2 border-gray-400 border-1 " />
                <input type="email" onChange={handleChnage} value={formData.email} name="email" id="email" placeholder="Rahul@exmple.com" className="text-center text-sm font-medium border-none focus:outline-none" />
            </div>

            <div className="text-center w-75">
                <label htmlFor="phoneNumber" className="block text-lg font-medium">Phone</label>
                <hr className="my-2 border-gray-400 border-1 " />
                <input type="number" onChange={handleChnage} value={formData.phoneNumber} name="phoneNumber" id="phoneNumber" placeholder="91+7890654321" className="text-center text-sm font-medium border-none focus:outline-none" />
            </div>

            <div className="text-center w-75">
                <label htmlFor="password" className="block text-lg font-medium">Password</label>
                <hr className="my-2 border-gray-400 border-1 " />
                <input type="password" onChange={handleChnage} value={formData.password} name="password" id="password" placeholder="Password" className="text-center text-sm font-medium border-none focus:outline-none" />
            </div>
        </form>
        </div>
    )
}