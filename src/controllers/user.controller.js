import {
  getUserProfileByToken,
  getAllUsers,
} from "../services/user.service.js";

const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];
    if (!jwt) {
      return res.status(404).send({ error: "token not found" });
    }
    const user = await getUserProfileByToken(jwt);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({
      error: error.messsage,
      message: "Not able to retrieve the profile",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export { getUserProfile, getAll };
