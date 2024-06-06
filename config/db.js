// importing sequelize for making connection my sql database
const Sequelize=require("sequelize")
require("dotenv").config()

// creating connection
const connection=new Sequelize(process.env.db_name,process.env.user_name,process.env.password,{
    host:"localhost",
    dialect:"mysql"
})
connection.authenticate()
.then(()=>console.log("connected to MySql database successfull"))
.catch((error)=>console.log(error.message))
// exporting connection
module.exports={connection}