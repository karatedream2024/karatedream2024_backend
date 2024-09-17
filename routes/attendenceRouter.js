import express from "express";
import { getattendences, updateAttendances } from "../controller/attendenceController.js";

const attendenceRouter = express.Router();
attendenceRouter.post("/getatten", getattendences)
attendenceRouter.post("/postupdateatten", updateAttendances)


export {attendenceRouter}