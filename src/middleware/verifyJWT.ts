import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {

  const authHeader =
    req.headers.authorization || (req.headers.Authorization as string);

  if (!authHeader?.startsWith("Bearer "))
    return res.status(403).send({ success: false, message: "no auth header" });

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.TOKEN_KEY as string,
    { complete: true },
    async (error: VerifyErrors | null, decoded: JwtPayload | undefined) => {
      if (error) {
        return res.status(403).send({ success: false, message: error.message });
      }
      if (decoded) {
       console.log(decoded.payload);
        req.body.userId= decoded.payload.id;
        req.body.roles= decoded.payload.role;
        next();
      }
    }
    //660d8344a3fe3e42e399d44a
  );
};
