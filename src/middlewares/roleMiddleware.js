import prisma from "../config/prisma.js";
import AppError from "../config/AppError.js";

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
        const{organisationId}=req.params;

        if(!organisationId){
            throw new AppError("Organisation ID required in params",400,"ORG_ID_REQUIRED")
        }

        const membership= await prisma.organisationMember.findUnique({
            where:{
                userId_organisationId:{
                    userId: req.user.id,
                    organisationId
                }
            }
        });

        if(!membership){
            throw new AppError("Not a member of this organisation",403,"FORBIDDEN")
        }

        if(membership.role!== requiredRole){
            throw new AppError("Insufficient permissions",403,"INSUFFICIENT_ROLE")
        }
        next();
    } catch (err) {
      next(err);
    }
  };
};
export default roleMiddleware;
