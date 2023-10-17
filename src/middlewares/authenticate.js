import { generateToken, getUserFromToken } from "../config/jwtProvides.js";
import { findUserById } from "../services/user.service.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).send({ error: "token not found..." });
    }
    const userId = getUserFromToken(token);
    const user = findUserById(userId);
    req.user = user;
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
  next();
};

export default authenticate;
