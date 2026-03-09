import express from "express";
import { register } from "../controllers/user.js";
import {login,logout,forgotPassword,resetPassword} from "../controllers/user.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;

