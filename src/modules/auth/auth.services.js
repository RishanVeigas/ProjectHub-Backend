import jwt from "jsonwebtoken";
import AppError from "../../config/AppError.js";
import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateRefreshToken,
} from "./auth.repository.js";

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};
export const register = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("User already exists", 400, "USER_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid Credentials", 401, "INVALID_CREDENTIALS");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid Credentials", 401, "INVALID_CREDENTIALS");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await updateRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (token) => {
  if (!token) {
    throw new AppError("Refresh token Required", 401, "NO_REFRESH_TOKEN");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await findUserById(decoded.userId);

  if (!user || user.refreshToken !== token) {
    throw new AppError("Invalid refresh token", 403, "INVALID_REFRESH");
  }

  const newAccessToken = generateAccessToken(user);

  return newAccessToken;
};
