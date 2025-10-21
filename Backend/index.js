import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import mongoose from "mongoose";
import { app } from "./app.js";

function main(){
    mongoose.connect(`${process.env.MONGO_URL}`)  // Mongodb connection
    .then((res)=> {
        console.log("mongodb connection successfully");
        app.listen(process.env.PORT, ()=>{
            console.log("Server is on port 8080")
        })
    })
    .catch((error)=> console.log(error));
};

app.get("/", (req, res)=>{
    console.log("Home request recived");
    res.send("ok")
});

main();