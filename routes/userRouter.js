
import express from "express";
import { deleteUser, getfulluser, getUser, postUser, updateUser } from "../controller/userController.js";

import multer from "multer";
const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'photo/img'); // Ensure 'photo/img' exists and is writable
  }, 
  filename: function (req, file, cb) {
    cb(null, file.originalname); // You may want to add unique identifiers to filenames
  }
});

const upload = multer({ storage: storage });
userRouter.post("/userregister", postUser)  
userRouter.post("/getuser", getUser)
userRouter.post("/getfulluser", getfulluser)
userRouter.put("/updateuser", updateUser)
userRouter.delete("/deleteuser", deleteUser)

userRouter.post("/upload", upload.single('avatar'), function (req, res, next) {
  res.status(200).json({ status: 'success', message: 'File uploaded successfully', data: req.file });
});

userRouter.post('/uploadmultiphoto', upload.array('avatar', 10), function (req, res, next) {
  console.log(req.files, 'these are files'); // Log the uploaded file details
  res.json({
    status: "success",
    message: "Files uploaded successfully", 
    data: req.files  // Send back the file information in the response
  });
});

export { userRouter } 