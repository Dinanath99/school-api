import express from "express";
import { logIn, logOut, signUp } from "../controller/auth/auth.controller";



const router = express.Router();

router.post("/login", logIn);
router.post("/signup", signUp);

router.get("/logout", logOut);

export default router;
