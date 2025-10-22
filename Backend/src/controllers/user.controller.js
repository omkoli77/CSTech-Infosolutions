import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import bcrypt from "bcryptjs";

async function generateAccessAndRefreshToken(userId) {
    try {
        let user = await User.findById(userId);
        let accessToken = user.generateAccessToken();
        let refreshToken = user.generateRefreshToken();
        let updatedUser = await User.findByIdAndUpdate(userId, {refreshToken}, {new: true});
        return {accessToken, refreshToken, updatedUser}
    }
    catch (error) {
        throw new ApiError(500, "generating access and refresh token fail while registering user")
    }
};

let cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
}


//==================== Register User ==================
const registerUser = asyncHandler(async (req, res, next) => {
    console.log("registere request recive", req.body);
    let { name, email, password, phoneNumber, role } = req.body?.user;

    if (!name || !email || !password || !phoneNumber) {
        throw new ApiError(400, "All fields required for user registration")
    };

    let userExist = await User.findOne({$or: [{email}, {phoneNumber}]});
    if (userExist) {
        throw new ApiError(400, "User all ready exsist")
    };

    if(password.length<6){
        throw new ApiError(400, "Password must be atleast 6 characters")
    }
    if(phoneNumber.length !== 10){
        throw new ApiError(400, "Please Enter correct phone number")
    }

    let user = await User.create({  // User save in db
        name,
        email,
        password,
        phoneNumber,
        role,
    });

    let registerdUser = await User.findById(user._id);
    if (!registerdUser) {
        throw new ApiError(500, "User Not registered")
    }

    let {accessToken, refreshToken, updatedUser} = await generateAccessAndRefreshToken(registerdUser._id);
    res.status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, updatedUser, "User Registered Successfully"))
});


//=================== Login User ====================
const loginUser = asyncHandler(async (req, res)=>{
    let { emailOrPhoneNumber, password } = req.body?.user;

    if (!emailOrPhoneNumber || !password) {
        throw new ApiError(400, "UserName or email required for user login")
    };

    let user = await User.findOne({ $or: [{ phoneNumber: emailOrPhoneNumber }, { email: emailOrPhoneNumber }] });
    if (!user){
        throw new ApiError(400, "User not registered");
    };

    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        throw new ApiError(400, "User entered wrong password")
    }

    let {refreshToken, accessToken, updatedUser} = await generateAccessAndRefreshToken(user._id);
    res.status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, updatedUser, "User Login Successfully"))
});


//================== Logout user ===================
const logoutUser = asyncHandler(async (req, res)=>{
    let user = await User.findByIdAndUpdate(req.user._id, {refreshToken: null}, {new: true}).select("-password -refreshToken");
    res.status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, user, "User logout successfully"))
});


//==================== Change password =================
const changePassword = asyncHandler(async (req, res)=>{
    let {password, newPassword} = req.body.user;

    if(!password || !newPassword){
        throw new ApiError(400, "Password and newPassword required while changing password")
    }
})

const deleteUser = asyncHandler(async (req, res)=>{
    await User.deleteMany({name: "adity"})
    res.send("user deleted")
})

export { registerUser, loginUser, logoutUser, deleteUser }