import express from "express";
import { get_log } from "../controllers/log_control.js";
import { verifyToken } from "../services/auth.js";


const router = express.Router();

router.get("/log-aktivitas", verifyToken, get_log);

export default router;