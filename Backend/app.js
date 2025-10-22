import express from "express";
import cookieParser from "cookie-parser";
import cors  from "cors";
import { ApiResponse } from "./src/utils/ApiResponse.js";

const app = express();
app.set("port", (process.env.PORT || 8080));

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173", "https://cstech-infosolutions-1.onrender.com", "https://cs-tech-infosolutions-eta.vercel.app"];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({extended: true, limit: "18kb"}));
app.use(express.json({limit: "18kb"}));
app.use(express.static("public"));

// import router
import userRouter from "./src/routes/user.route.js";
import agentRouter from "./src/routes/agent.route.js";
import taskRouter from "./src/routes/task.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/agents", agentRouter);
app.use("/api/v1/task", taskRouter);

app.use((error, req, res, next)=>{
    let statusCode = error.statusCode || 500;
    let message = error.message || "Something went wrong";
    console.log(error)
    res.status(statusCode).json(new ApiResponse(statusCode, {}, message))
});

export {app}
