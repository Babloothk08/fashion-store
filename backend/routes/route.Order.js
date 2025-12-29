import { Router } from "express"
import { verifyJWT } from "../middleware/authMiddleWare.js"
import { createOrder, getOrder } from "../controller/order.controller.js"

const router = Router()

router.use(verifyJWT)
router.post("/order", createOrder)
router.get("/orderDetails", getOrder )

export default router