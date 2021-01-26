import express from "express"
const router = express.Router()
import {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,deleteUser,getUserById,updateUser} from "../controllers/userControllers.js"
import {protect,admin,forgotPassword,resetPassword} from "../middleware/authMiddleware.js"

router.route("/").post(registerUser).get(protect,admin,getUsers)
router.post("/login",authUser)
router.put("/forgot_password",forgotPassword)
router.put("/reset_password",resetPassword)
router.route("/profile").get(protect,getUserProfile).put(protect, updateUserProfile)
router.route("/:id").delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)

export default router