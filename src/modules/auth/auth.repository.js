import prisma from "../../config/prisma.js";

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email }});
};

export const createUser = (data) => {
  return prisma.user.create({
    data,
  });
};

export const updateRefreshToken = (userId, refreshToken) => {
  return prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
  });
};

export const findUserById=(id)=>{
  return prisma.user.findUnique({where:{id}})
};