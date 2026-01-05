import Router from "express"
import { verifyJWT } from "../middleware/authMiddleWare.js"
import { confirmRoles } from "../middleware/role.middleWare.js"
import { getAllUsersForManager } from "../controller/manager.controller.js"

const router = Router()
router.get("/user", verifyJWT , confirmRoles("manager"), getAllUsersForManager )

export default router