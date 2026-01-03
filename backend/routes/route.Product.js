import { Router } from "express";
import { addProduct, allData, searchProduct } from "../controller/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/authMiddleWare.js";
import { confirmRoles } from "../middleware/role.middleWare.js";

const router = Router()
// router.post('/product', addProduct)
// If you used upload.single() → Only ONE file will work.
// If you used upload.array() → Also WRONG for multiple named files.
// You MUST use upload.fields([...])


router.post(
  "/addProduct",
  verifyJWT,
  confirmRoles("admin", "manager"),
  upload.fields([
    { name: "avatar", maxCount: 1 },
    // { name: "coverImage", maxCount: 1 },
  ]),
  addProduct
);
router.get("/", allData);
// router.route('/data').get(allData)
router.get('/search', searchProduct)
export default router