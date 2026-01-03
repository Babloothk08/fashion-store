import express from "express"
import dotenv from "dotenv"
import cors from "cors"

// import {jwt} from ""
// import authRoutes from './routes/route.User.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT ;
console.log("P", PORT);

import userRouter from "./routes/route.User.js"
import connectDB from "./config/db.js";
import productRouter from "./routes/route.Product.js"
import cartRouter from "./routes/route.Cart.js"
import addressRouter from "./routes/route.Address.js"
import orderRouter from "./routes/route.Order.js"
import adminRouter from "./routes/route.Admin.js"


// app.use(cors())
app.use(cors({
  origin : [
    "http://localhost:5173",
    "https://fashion-store-neon-kappa.vercel.app",
    "*"
     
  ],
  credentials : true,
}));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is working");
});




            
app.use("/api", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter)
app.use("/api", orderRouter )
app.use("/api", adminRouter)
connectDB()

app.listen(PORT,() =>{
    console.log(`server is running on port:${PORT}`);  
})