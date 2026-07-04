import AppError from "../config/AppError.js";
import jwt from "jsonwebtoken";
import { findUserById } from "../modules/auth/auth.repository.js";

const authMiddlewae = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new AppError("Unauthorized", 401, "NO_TOKEN");
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decoded.userId);

    if (!user) {
      throw new AppError("User not found", 404, "User not found");
    }

    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};
export default authMiddlewae;
