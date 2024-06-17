const ChatRoom = require('../modal/chatRoomModal');
const User = require('../modal/userModal');
const bcrypt=require("bcrypt")

const createChatRoom = async (req, res) => {
    try {
        const { roomId, password } = req.body;
        const userId = req.user.userId;
        const user = await User.findOne({where:{userId}});
 
        if (!user.isPrime) {
          return res.status(403).json({ error: 'Only prime members can create chat rooms' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const chatRoom = await ChatRoom.create({ 
           roomId,
           password: hashedPassword, 
           createdBy: userId,
           members: [userId] 
          });
        //  console.log(chatRoom)
        res.status(201).json(chatRoom);
      } catch (error) {
        res.status(500).json({ error: 'Room creation failed' });
      }
};

const joinChatRoom = async (req, res) => {
  try {
    const { roomId, password } = req.body;
    const userId = req.userId;
    const user = await User.findByPk(userId);
   
    const room = await ChatRoom.findOne({where:{roomId}});
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const validPassword = await bcrypt.compare(password, room.password);

    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const userRooms = await room.getUsers();
    console.log(userRooms)
    if (userRooms.length >= 6) return res.status(400).json({ error: 'Room is full' });

    const userJoinedRooms = await user.getChatRooms();
    if (userJoinedRooms.length >= 1 && !user.isPrime && user.availCoins < 150) {
        return res.status(400).json({ error: 'Insufficient coins' });
    }

    if (userJoinedRooms.length >= 1 && !user.isPrime) {
        user.availCoins -= 150;
        await user.save();
    }

    await room.addUser(user);
    res.status(200).json({ message: 'Joined room successfully' });
} catch (err) {
    res.status(500).json({ error: 'Failed to join chat room' });
}
};

module.exports = { createChatRoom, joinChatRoom };
