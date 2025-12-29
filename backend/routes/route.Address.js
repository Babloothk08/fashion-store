import {Router } from "express";
import { verifyJWT } from "../middleware/authMiddleWare.js";
import { addAddress, deleteAddress, getAddress } from "../controller/address.controller.js";

const route = Router();
route.use(verifyJWT)

route.post("/", addAddress)
route.get("/", getAddress)
route.delete("/removeAddress/:addressId", deleteAddress)

export default route