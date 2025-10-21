import router from "express";
import { deleteUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import { verifyJwt } from "../middlwares/auth.middleware.js";
const userRouter = router();

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJwt ,logoutUser);
userRouter.route("/delete").delete(deleteUser);

export default userRouter;