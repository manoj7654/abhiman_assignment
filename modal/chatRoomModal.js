const { DataTypes } = require('sequelize');
const { connection } = require('../config/db');

const ChatRoom = connection.define('ChatRoom', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  createdBy: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  maxCapacity: { 
    type: DataTypes.INTEGER, 
    defaultValue: 6 
  },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: true
});

connection.sync();
module.exports = ChatRoom;
