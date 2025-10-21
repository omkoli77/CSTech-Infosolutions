import {Router} from "express"
import multer from "multer";
import { addCsvFile, totalTask, totolCSVList } from "../controllers/task.controller.js";
import { verifyJwt } from "../middlwares/auth.middleware.js";
const upload = multer({ dest: 'uploads/' });
const taskRouter = Router();

taskRouter.route("/").post(upload.single('csvFile'), addCsvFile);
taskRouter.route("/").get(totolCSVList);
taskRouter.route("/list").get(verifyJwt, totalTask)

export default taskRouter;
