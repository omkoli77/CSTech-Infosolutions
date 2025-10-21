import {Router} from "express"
import { verifyJwt } from "../middlwares/auth.middleware.js";
import { getAgents, registerAgent } from "../controllers/agent.controller.js";

let agentRouter = Router();

agentRouter.route("/register").post(verifyJwt, registerAgent);
agentRouter.route("/").get(verifyJwt, getAgents);

export default agentRouter;

