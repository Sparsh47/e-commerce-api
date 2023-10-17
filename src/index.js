import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import adminProductRouter from "./routes/adminProduct.routes.js";
import cartRouter from "./routes/cart.routes.js";
import cartItemRouter from "./routes/cartItem.routes.js";
import orderRouter from "./routes/order.routes.js";
import adminRouter from "./routes/adminOrder.routes.js";
import ratingRouter from "./routes/rating.routes.js";
import reviewRouter from "./routes/review.routes.js";

const app = express();
const port = 3010;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ success: "true", message: "Successfully started the server" });
});

app.use("/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cart_items", cartItemRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin/orders", adminRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/reviews", reviewRouter);

app.listen(port, async () => {
  await connectDB();
  console.log(`Ecommerce API is listening on port ${port}`);
});
