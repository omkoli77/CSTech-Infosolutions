import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
import csv from "csv-parser";
import User from "../models/user.model.js";
import {Task} from "../models/task.model.js"
import { List } from "../models/list.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


//=================== Add CSV file ===================
export const addCsvFile = asyncHandler(async (req, res) => {
    console.log("csv file registered");
    let results = [];
    if(req.file?.path){
        console.log(req.file.path)
    
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            console.log("CSV converted to array:");
            fs.unlinkSync(req.file.path);
        });
        
        let labours = await User.find({role: "agent"});
        let tasks = results
    
        const totalTasks = tasks.length;
        const totalLabours = labours.length;
        const baseTasks = Math.floor(totalTasks / totalLabours);
        const remainder = totalTasks % totalLabours;
        let taskIndex = 0;
        let taskList = []

        // Equal distribution
        for (let i = 0; i < totalLabours; i++) {
            let work = tasks.slice(taskIndex, taskIndex + baseTasks);

            work.map(async (el)=>{
                try{
                    let sample = await Task.create({...el, asignedTo: labours[i]._id})
                }
                catch(error){
                    console.log("while updating tasks error")
                }
            });
            taskIndex += baseTasks;
        }

        // Distribute remaining tasks sequentially
        for (let i = 0; i < remainder; i++) {
            let work = tasks[taskIndex];
            let sample = await Task.create({...work, asignedTo: labours[i]._id})
            taskIndex++;
        };

        await List.create({totalList: 1});
        let taskList2 = await Task.find({}).populate("asignedTo")
        console.log(results)
        return res.status(200).json(new ApiResponse(200, taskList2, "CSV File Added Successfully"))
    }
    return res.status(400).json(new ApiResponse(200, {}, "CSV Fil Not Uploaded successfully"))
});


//======================= Get Total List =====================
export const totolCSVList = asyncHandler(async (req, res)=>{
    let csvList = await List.find({});
    let lotalCSV = csvList.reduce((accu, el)=> accu+1, 0);
    res.status(200).json(new ApiResponse(200, lotalCSV, ""))
});


//========================== Toatl Task =================
export const totalTask = asyncHandler(async (req, res)=>{
    let taskList = await Task.find({}).populate("asignedTo");
    let totalTask = taskList.reduce((accu, el)=> accu+1, 0);
    res.status(200).json(new ApiResponse(200, {totalTask, taskList}, ""))
});

