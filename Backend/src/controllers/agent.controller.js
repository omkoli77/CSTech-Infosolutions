import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


//==================== Register Agnet ==================
const registerAgent = asyncHandler(async (req, res, next) => {
    console.log("agent registere request recive", req.body);
    let { name, email, password, phoneNumber } = req.body?.user;

    if (!name || !email || !password || !phoneNumber) {
        throw new ApiError(400, "All fields required for Agent registration")
    };

    let userExist = await User.findOne({$or: [{email}, {phoneNumber}]});
    if (userExist) {
        throw new ApiError(400, "Agent all ready exsist")
    };

    if(password.length<3){
        throw new ApiError(400, "Password must be atleast 3 characters")
    }
    if(phoneNumber.length !== 10){
        throw new ApiError(400, "Please Enter correct phone number")
    }

    let user = await User.create({  // User save in db
        name,
        email,
        password,
        phoneNumber,
        role: "agent"
    });

    let registerdUser = await User.findById(user._id);
    if (!registerdUser) {
        throw new ApiError(500, "Agent Not registered")
    }

    res.status(200)
    .json(new ApiResponse(200, registerdUser, "Agent Registered Successfully"))
});


//==================== Get Agent count ===================
const getAgents = asyncHandler(async (req, res)=>{
    let agents = await User.find({role: "agent"});
    let totalAgent = agents.reduce((accu, el)=> accu+1, 0);
    res.status(200).json(new ApiResponse(200, totalAgent, "Successfully agent count"))
})

export {registerAgent, getAgents}