import jwt from "jsonwebtoken";
import { User } from "../models/model.User.js";
// import { Product } from "../models/model.User.js";

export const verifyJWT = async (req, res, next) => {
  try {
    // Token uthao
   
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json("Authorization header missing");
    }

  
    const token = authHeader.split(" ")[1];   
    if (!token) {
      return res.status(401).json("Token not found");
    }
    // to [1] ka matlab hai:
    // array ke dusre element ko lo
    // (joki actual token hai)
    

    // Verify karo
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // User dhoondo
    const user = await User.findById(decodedToken.id); // 👈 "id", not "_id"
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Attach user to req
    req.user = user;
    next();

  } catch (error) {
    console.error(error);
    res.status(401).json("Invalid or expired token");
  }
};
