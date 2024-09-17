import express from "express";
import { createfees, deleteFee, getfees } from "../controller/feesController.js";

const feeRouter = express.Router();
// attendenceRouter.get("/getattendence", getattendences)
feeRouter.post("/updatefee", createfees)
feeRouter.post("/getfee", getfees)
feeRouter.delete("/deletefee/:id/:studentId", deleteFee)


export {feeRouter}