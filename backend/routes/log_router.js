import express from "express";
import { get_log } from "../controllers/log_control.js";


const router = express.Router();

router.get(
    "/log-aktivitas",
    /*authenticate,
    authorize(["admin", "petugas"]),*/
    get_log
);

export default router;