
export const Boxes = ({initialData})=>{
    // console.log(initialData)
    return(
        <div className="boxes flex justify-around">
                    <div className="box1 bg-gray-800 w-95 h-30 rounded-md flex items-center ">
                        <div className="ml-8">
                            <p className="text-3xl font-semibold">{initialData.totalAgent}</p>
                            <p className="text-gray-300 text-lg">Total Agents</p>
                        </div>
                    </div>

                    <div className="box1 bg-gray-800 w-95 h-30 rounded-md flex items-center ">
                        <div className="ml-8">
                            <p className="text-3xl font-semibold">{initialData.listUploaded}</p>
                            <p className="text-gray-300 text-lg">List Uploaded</p>
                        </div>
                    </div>

                    <div className="box1 bg-gray-800 w-95 h-30 rounded-md flex items-center ">
                        <div className="ml-8">
                            <p className="text-3xl font-semibold">{initialData.totalTask}</p>
                            <p className="text-gray-300 text-lg">Total Task</p>
                        </div>
                    </div>
                </div>
    )
}