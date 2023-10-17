import {
  createOrder,
  findOrderById,
  usersOrderHistory,
} from "../services/order.service.js";

const createOrders = async (req, res) => {
  const user = await req.user;
  try {
    let createdOrder = await createOrders(user, req.body);
    return res.status(201).send(createdOrder);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const findOrder = async (req, res) => {
  const user = await req.user;
  try {
    let createdOrder = await findOrderById(req.params.id);
    return res.status(201).send(createdOrder);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const orderHistory = async (req, res) => {
  const user = await req.user;
  try {
    let createdOrder = await usersOrderHistory(user._id);
    return res.status(201).send(createdOrder);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export { createOrder, findOrder, orderHistory };
