const express=require("express");
const { createChatRoom, joinChatRoom, inviteParticipant } = require("../controller/chatRoomController");
const { authenticate } = require("../middleware/authentication");
const chatRoomRouter=express.Router();



chatRoomRouter.post("/chatrooms",authenticate,createChatRoom)
chatRoomRouter.post("/join",authenticate,joinChatRoom)
chatRoomRouter.post("/invite",authenticate,inviteParticipant)

module.exports={chatRoomRouter}