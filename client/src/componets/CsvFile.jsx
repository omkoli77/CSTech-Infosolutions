import { useState , useEffect} from "react";
import axios from "axios"

export const CsvFile = ({fetchDashboardData, setInitailData, setRegister, removeClientMsg}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    let backend = "http://localhost:8080/api/v1/task";

    
    const handleFileChange = (event) => {  // handle form change
        if (event.target.files && event.target.files[0]) {
          setSelectedFile(event.target.files[0]);
        }
    };
    useEffect(() => {
    // Reset previous CSV state when component mounts
    setSelectedFile(null);
    }, []);

    const handleSubmit = (e)=>{  // handle form submit
        e.preventDefault()
        if (!selectedFile) return alert("Please select a file");
        const formData = new FormData();
        formData.append('csvFile', selectedFile); // 'csvFile' is the key for the backend
        axios.post(backend, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true
        })
        .then((res)=> {
            console.log("file uploaded successfully", res.data.data)
            setSelectedFile(null)
            document.querySelector('input[type="file"]').value = "";
            fetchDashboardData()
            setRegister({success: res.data.success, message: res.data.message})
            removeClientMsg()
        })
        .catch((error)=> {
            console.log("file not uploaded", error)
            setRegister({success: error.response.data.success, message: error.response.data.message})
            removeClientMsg()
        })
        setSelectedFile(null)
    }

    return (
        <div className="csv bg-gray-800 m-4 my-8 p-1 rounded-md">
            <h1 className="text-xl font-semibold m-5 block">Upload CSV File</h1>
            <form onSubmit={handleSubmit} className="flex justify-between items-center px-6">
                <input type="file" onChange={handleFileChange} className="border-1 border-blue-300 rounded-md w-full p-2 my-2" accept=".csv" required/>
                <button className="bg-blue-500 h-10 w-25 text-white rounded-md mx-2">Upload</button>
            </form>
        </div>
    )
}