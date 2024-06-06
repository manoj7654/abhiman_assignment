const express=require("express");
const { createChatRoom } = require("../controller/chatRoomController");
const { authenticate } = require("../middleware/authentication");
const chatRoomRouter=express.Router();



chatRoomRouter.post("/chatrooms",authenticate,createChatRoom)
// chatRoomRouter.post("/login",login)

module.exports={chatRoomRouter}