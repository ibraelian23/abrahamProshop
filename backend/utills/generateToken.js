import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}
export {generateToken}
