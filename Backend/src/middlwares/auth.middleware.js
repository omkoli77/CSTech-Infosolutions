import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

//================= Verify user authenticate or not ==============
const verifyJwt = asyncHandler(async (req, res, next)=>{
    let {accessToken, refreshToken} = req.cookies;
    if(!accessToken){
        throw new ApiError(400, "AccessToken was required to access protected routes")
    };

    let decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    if(!decodedAccessToken){
        throw new ApiError(400, "AccessToken token not decoded while accessing protected routes")
    };

    let user = await User.findById(decodedAccessToken._id).select("-password -refreshToken");
    if(!user){
        throw new ApiError(400, "User not Authorized")
    };

    req.user = user;
    next()
});

export {verifyJwt};