import { findUserCart, addCartItem } from "../services/cart.service.js";

const findCart = async (req, res) => {
  const user = await req.user;
  try {
    const cart = await findUserCart(user._id);
    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  const user = await req.user;
  console.log("User:", user);
  try {
    const cartItem = await addCartItem(user._id, req.body);
    console.log("CART ITEM:", cartItem);
    return res.status(200).send(cartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export { findCart, addItemToCart };
