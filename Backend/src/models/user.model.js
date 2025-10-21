import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new Schema({
    name: {
        type: String,  // UserName 
        required: true,
        minLength: "2"
    },

    email: {
        type: String,  // Email
        unique: true,
        required: true,
    },

    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },

    password: {
        type: String,  // Hashed password
        required: true
    },

    role: {
        type: String,
        enum: ["admin", "agent"],
        default: "admin",
        required: true
    },

    refreshToken: {
        type: String,
    },
},
    {
        timestamps: true // Enable timestamps
    }
);


// Hashed before password save
UserSchema.pre("save", async function (next){
    if (!this.modifiedPaths("password")) next();
    this.password = await bcrypt.hash(this.password, 8);
    next()
});

// Create access token
UserSchema.methods.generateAccessToken = function(){ 
    return jwt.sign({
        _id: this._id,
        userName: this.userName,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRETE,
        { expiresIn: "1d" }
    )
};

// Create refresh token
UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
            email: this.email
        },
        process.env.REFRESH_TOKEN_SECRETE,
        { expiresIn: "10d" }
    )
};


const User = mongoose.model("User", UserSchema);
export default User