import jwt from "jsonwebtoken";

const SECRET_KEY = "gjkdhjfgkhdgsfkjndjhgnvjdnghsghfdngvmdkslmof";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  return token;
};

const getUserFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

export { generateToken, getUserFromToken };
