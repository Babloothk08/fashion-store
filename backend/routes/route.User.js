import Router from 'express'
import {registerUser, loggedIn, getProfile, updateProfile, logoutUser, sendOTP, verifyOTP, resetPassword} from "../controller/user.controller.js"
import {verifyJWT} from "../middleware/authMiddleWare.js"
// import { Product } from '../models/model.Product.js'

const router = Router()

router.post('/register', registerUser);
router.post('/signIn', loggedIn);
router.post('/logOut', verifyJWT, logoutUser);

router.route("/profile").get(verifyJWT, getProfile)
router.route("/profile").put(verifyJWT, updateProfile)    // update route

router.post("/forgot-password", sendOTP);      // Step 1: send OTP
router.post("/verify-otp", verifyOTP);         // Step 2: verify OTP
router.post("/reset-password", resetPassword); // Step 3: reset password
// router.route("/profiles").get(verifyJWT, userProfile)

// router.route("/product").post( Product)
// router.post('/product', addProduct)
export default router



