import { createUser, findUserByEmail } from "../services/user.service.js";
import { generateToken, getUserFromToken } from "../config/jwtProvides.js";
import bcrypt from "bcrypt";
import { createCart } from "../services/cart.service.js";

const register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    const jwt = generateToken(user._id);
    await createCart(user);
    return res.status(200).send({ jwt, message: "register success" });
  } catch (error) {
    return res.status(500).send * { error: error.message };
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with email: " + email });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password..." });
    }
    const jwt = generateToken(user._id);
    return res.status(200).send({ jwt, message: "Login success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export { register, login };
