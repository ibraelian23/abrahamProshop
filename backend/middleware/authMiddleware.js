import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
// import validator from "validator"
import sendEmail from "../utills/sendMail.js"
import _ from "lodash"



const protect=asyncHandler(async(req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token=req.headers.authorization.split(" ")[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user= await User.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            console.error(error)

            res.status(401)

            throw new Error("Not authorized, token failed")

        }
    }

    if(!token){
        res.status(401)
        throw new Error("not Authorized, no token")
    }
})

const admin=(req,res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    } else {
        res.status(401)
        throw new Error("Not Authorized As Admin")
    }
}

const forgotPassword =  asyncHandler(async(req,res) => {
    const {email}=req.body
        const user = await User.findOne({email})
        if (!user){
            res.status(400)
            throw new Error("User with this email does not exist")
        }

        const token=jwt.sign({_id:user._id},process.env.RESET_KEY,{expiresIn:"50m"})
        
        await user.updateOne({resetLink:token}, function (err,success) {
            if (err){
                res.status(400)
                throw new Error("reset password link error")
            } else {
                let domain=req.headers.host
                if(domain==="127.0.0.1:5000"){
                    domain="localhost:3000"
                }
                sendEmail(
                    email,
                    "ibraheem97.elian@gmail.com",
                    "Password Reset",
                    `
                    <div>Click the link below to reset your password</div></br>
                    <div>http://${domain}/resetpassword/${token}</div>
                    `
                )
                return res.json({message:"email has been sent"})
            }
    
        })



    })

const resetPassword = asyncHandler(async(req,res) => {
    const {resetLink,newPass} = req.body
    if(resetLink){
        jwt.verify(resetLink,process.env.RESET_KEY,function(error,decodedData){
            if(error){
                 res.status(401)
                 throw new Error("Incorrect token or it is expired")
            }
                User.findOne({resetLink},(err,user) => {
                if (err || !user){
                    res.status(400)
                    throw new Error("User with this token does not exist")
                }
                const obj={
                    password:newPass,
                    resetLink:""
                }

                user = _.extend(user,obj)
                user.save((err,result) => {
                    if (err){
                        res.status(400)
                        throw new Error("reset password error")
                    } else {
                        return res.status(200).json({message:"your password has been changed"})
                    }
                })
            })
        })
    } else {
            res.status(401)
            throw new Error("Authentication error")
        
    }

})

export {protect,admin,forgotPassword,resetPassword}
