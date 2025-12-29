import { Router } from "express";
import { addToCart, getCart, updateCartQuantity, removeFromCart} from "../controller/cart.controller.js";
import { verifyJWT } from "../middleware/authMiddleWare.js"

const router = Router();

router.post("/add", verifyJWT, addToCart);
router.get("/get", verifyJWT, getCart);
// router.post("/addCart", verifyJWT, addProductToCart);
router.put("/update", verifyJWT, updateCartQuantity);
router.delete("/remove/:productId", verifyJWT, removeFromCart);  // (URL ke andar data hota hai)
// router.delete("/clear", verifyJWT, clearCart);

export default router;

