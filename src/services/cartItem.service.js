import {
  createUser,
  findUserById,
  findUserByEmail,
  getAllUsers,
  getUserProfileByToken,
} from "./user.service.js";
import CartItem from "../models/cartItem.model.js";

async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    const item = await findCartItemById(cartItemId);

    if (!item) {
      throw new Error("cart item not found: ", cartItemId);
    }
    const user = await findUserById(item.userId);
    if (!user) {
      throw new Error("user not found:", userId);
    }
    if (user._id === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updateCartItem = await item.save();
      return updateCartItem;
    } else {
      throw new Error("You can't update this cart item.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  const user = await findUserById(userId);
  if (user._id.toString() === cartItem.userId.toString()) {
    await CartItem.findByIdAndDelete(cartItemId);
  }
  throw new Error("You can't remove another user's item");
}

async function findCartItemById(cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("CartItem can not be found with id", cartItemId);
  }
}

export { updateCartItem, removeCartItem, findCartItemById };
