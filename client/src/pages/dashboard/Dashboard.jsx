import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Boxes } from "../../componets/Boxes";
import { Agents } from "../../componets/Agents";
import { CsvFile } from "../../componets/CsvFile";
import { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { CiViewList } from "react-icons/ci";


export const Dashboard = ()=>{
    const [initialData, setInitailData] = useState({totalAgent: 0, listUploaded: 0, totalTask: 0, totalTaskList: []});
    let [register, setRegister] = useState({success: null, message: null});
    let navigate = useNavigate()

    let backend = "https://cstech-infosolutions-1.onrender.com/api/v1";
    
    function removeClientMsg(){  // remove client side msg
        setTimeout(()=>{
            setRegister({success: null, message: null})
        }, 2000)
    }

    async function fetchDashboardData (){
        let sample = {totalAgent: 0, listUploaded: 0, totalTask: 0, totalTaskList: []}
        axios.get(`${backend}/agents`,{ withCredentials: true })  
        .then((res)=> {
            sample.totalAgent = res.data.data
        })
        .catch((error)=> console.log(error));

        axios.get(`${backend}/task`,{ withCredentials: true })  
        .then((res)=> {
            sample.listUploaded = res.data.data
        })
        .catch((error)=> console.log(error));

        axios.get(`${backend}/task/list`,{ withCredentials: true })  
        .then((res)=> {
            sample.totalTask = res.data.data.totalTask
            sample.totalTaskList = res.data.data.taskList
            setInitailData(sample)
            setRegister({success: res.data.success, message: res.data.message})
            removeClientMsg()
        })
        .catch((error)=> {
            setRegister({success: error.response.data.success, message: error.response.data.message})
            removeClientMsg()
        });
    }

    useEffect(()=>{
      fetchDashboardData()
    }, []);

    async function handleLogout(){   // send logout request to backend
        console.log("logout click")
        axios.post(`${backend}/users/logout`, {},{ withCredentials: true })  
        .then((res)=> {
            if(res.data.success){
                navigate("/login")
            }
        })
        .catch((error)=> console.log(error));
    }

    return(
        <div className="Dashboard flex">
            <div className="sidebar bg-gree-400 w-1/4 h-dvh flex items-top flex-col pl-5">
                <p className="text-xl my-8 font-semibold">Admin Dashboard</p>
                <IoIosHome className="inline"/>
                <span className="mb-5">Dashboard</span>

                <FaRegUser/> <span className="mb-5"> Agents</span>

                <SlCalender /> <span className="mb-5"> Upload CSV</span>

                <CiViewList /> <span className="mb-5"> Distributed list</span>
            </div>

            {/* main dashboard */}
            <div className="mainBox bg-gray-700 w-full  text-white">
                <div className="navbar justify-between">   
                    <h1 className="text-3xl font-semibold ml-5">Dashboard</h1>
                    <button onClick={handleLogout} className="bg-rose-700 font-semibold w-30 p-2 rounded-lg m-5 text-white">Logout</button>
                </div>
                <p className="text-center bg-gray-800 my-3" style={register.success?{color: "green"}: {color: "red"}}>{register.message}</p>

                <Boxes initialData={initialData}/> 

                <Agents initialData={initialData} setInitailData={setInitailData} fetchDashboardData={fetchDashboardData} removeClientMsg={removeClientMsg} setRegister={setRegister}/>

                <CsvFile initialData={initialData} setInitailData={setInitailData} fetchDashboardData={fetchDashboardData} removeClientMsg={removeClientMsg} setRegister={setRegister} />

                <div className="csv bg-gray-800 m-4 my-8 p-1 rounded-md">
                    <div className="flex justify-between px-8 border-b-1 border-blue-300 py-2">
                        <p>Agent</p>
                        <p>First Name</p>
                        <p>Phone</p>
                        <p>Notes</p>
                    </div>

                    {initialData.totalTaskList.map((task)=>{
                        return(
                            <div className="flex justify-between text-gray-400 px-8 border-b-1 border-blue-300 py-2" key={task._id}>
                                <p>{task.asignedTo.name}</p>
                                <p>{task.FirstName}</p>
                                <p className="">{task.Phone}</p>
                                <p className="">{task.Notes}</p>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}