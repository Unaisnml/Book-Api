import express from "express";
const router = express.Router();
import { loginUser, registerUser } from "../controllers/userController.js";

router.post("/", registerUser);
router.post("/login", loginUser);

export default router;
