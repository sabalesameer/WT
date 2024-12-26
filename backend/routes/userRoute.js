import express from "express";
import { register, login, logout, myProfile, getAdmin } from "../controll/userConterol.js";
import { verifyToken } from "../middleWare/authUser.js";

const router = express.Router();

router.post('/register', register);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.get("/my-profile", verifyToken, myProfile);
router.get("/admins", verifyToken, getAdmin);
router.get("/profile",verifyToken,myProfile);

export default router;
