import { NextFunction, Request, Response } from "express";

export const verifyRoles = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.roles || req.body.roles.length === 0) {
            return res.status(401).send({ success: false, message: "No roles provided" });
        }
        
        const hasAllowedRole = req.body.roles.some((role: string) => allowedRoles.includes(role));
        
        if (!hasAllowedRole) {
            return res.status(401).send({ success: false, message: "You are not authorized" });
        }
        
        next();
    }
}
