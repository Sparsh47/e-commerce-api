import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cartItem: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartItem",
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalItem: {
    type: Number,
    required: true,
    default: 0,
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = mongoose.model("cart", cartSchema);
export default Cart;
