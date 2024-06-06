const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../modal/userModal');
require("dotenv").config()

const register=async(req,res)=>{
    try {
        const {deviceId, name, phone, availCoins, password,isPrime } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({deviceId, name, phone, availCoins, password: hashedPassword,isPrime });
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const login=async(req,res)=>{
    try {
        const { id, password } = req.body;
        const user = await UserModel.findOne({ where: { id } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.secret, { expiresIn: '3h' });
        res.json({ message:"Login successfull",token });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

module.exports={register,login}