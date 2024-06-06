const ChatRoom = require('../modal/chatRoomModal');
const User = require('../modal/userModal');
const bcrypt=require("bcrypt")

const createChatRoom = async (req, res) => {
    try {
        const { roomId, password } = req.body;
        const userId = req.userId;
        const user = await User.findByPk(userId);
        if (!user.isPrime) {
          return res.status(403).json({ error: 'Only prime members can create chat rooms' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
      
        const chatRoom = await ChatRoom.create({ roomId, password: hashedPassword, createdBy: userId });
    
        res.status(201).json(chatRoom);
      } catch (error) {
        res.status(500).json({ error: 'Room creation failed' });
      }
};

const joinChatRoom = async (req, res) => {
    try {
        const { roomId, password } = req.body;
        const userId = req.userId;
    
        const chatRoom = await ChatRoom.findByPk(roomId);
        if (!chatRoom) {
          return res.status(404).json({ error: 'Chat room not found' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, chatRoom.password);
        if (!isPasswordValid) {
          return res.status(403).json({ error: 'Invalid room password' });
        }
    
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Check if the user is a prime member and has already joined a room for free
        const joinedRoomsCount = await Message.count({ where: { userId } });
        if (!user.isPrime && joinedRoomsCount >= 1) {
          if (user.availCoins < 150) {
            return res.status(403).json({ error: 'Insufficient coins' });
          }
          user.availCoins -= 150;
          await user.save();
        }
    
        // Ensure non-prime members have enough coins to join the room
        if (!user.isPrime && joinedRoomsCount < 1 && user.availCoins < 150) {
          return res.status(403).json({ error: 'Insufficient coins' });
        }
    
        res.status(200).json({ message: 'Joined chat room successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Joining room failed' });
      }
};

module.exports = { createChatRoom, joinChatRoom };
