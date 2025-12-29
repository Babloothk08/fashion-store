import Router from "express";
import { verifyJWT } from "../middleware/authMiddleWare.js";
import { confirmRoles } from "../middleware/role.middleWare.js";
import { getAllUsers, getAllManagers, addManager, deleteManager } from "../controller/admin.controller.js";

const router = Router();

// 🛡️ Admin-only routes
router.get("/users", verifyJWT, confirmRoles("admin"), getAllUsers);
router.get("/managers", verifyJWT, confirmRoles("admin"), getAllManagers);
router.post("/manager", verifyJWT, confirmRoles("admin"), addManager);
router.delete("/manager/:managerId", verifyJWT, confirmRoles("admin"), deleteManager);

export default router;
