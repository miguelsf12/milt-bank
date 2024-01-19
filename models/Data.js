const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const User = require('./Users')

const Data = db.define('Data', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 1300.00,
  },
  address: {
    type: DataTypes.STRING,
  },
  pix: {
    type: DataTypes.STRING,
  }
})

module.exports = Data
