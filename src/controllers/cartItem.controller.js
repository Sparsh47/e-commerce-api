import {
  updateCartItem,
  removeCartItem,
} from "../services/cartItem.service.js";

const updateCart = async (req, res) => {
  const user = req.user;
  try {
    const updatedCartItem = await updateCartItem(
      user._id,
      req.params.id,
      req.body
    );
    return res.status(200).send(updatedCartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const removeCart = async (req, res) => {
  const user = req.user;
  try {
    await removeCartItem(user._id, req.params.id);
    return res.status(200).send({ message: "cart item removed successfully." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export { updateCart, removeCart };
