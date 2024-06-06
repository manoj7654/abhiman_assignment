const jwt=require("jsonwebtoken");
require("dotenv").config();

const authenticate=async(req,res,next)=>{
    const token=req.headers.authorization;
    try {
        if(token){
            const decode=jwt.verify(token,process.env.secret);
            if(decode){
              console.log(decode.userId)
                const userId=decode.userId;
                req.userId=userId;
             
                next();
            }else{
                res.json({message:"Please login again"})
            }
        }else{
            res.json({message:"Please login first"})
        }
    } catch (error) {
        res.json(error.message)
    }
}

module.exports={authenticate}