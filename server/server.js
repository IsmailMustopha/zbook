import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import addressRouter from "./routes/address.route.js";
import orderRouter from "./routes/order.route.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB()
await connectCloudinary()

const allowedOrigins = [
  "http://localhost:5173" || "https://zbook-frontend.onrender.com/",
]; 

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use("/api/product", productRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
  res.send("API successfully connected");
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
