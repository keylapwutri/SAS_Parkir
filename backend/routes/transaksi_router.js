import express from "express";
import { get_semua_transaksi, get_transaksi, tambah_transaksi, update_transaksi } from "../controllers/transaksi_control.js";
import { allowRole, verifyToken } from "../services/auth.js";

const router = express.Router();

router.get("/transaksi", get_semua_transaksi);
router.get("/transaksi/:id", get_transaksi);

router.post("/transaksi", verifyToken, allowRole("admin", "petugas"), tambah_transaksi);
router.patch("/transaksi/:id/keluar", verifyToken, allowRole("admin", "petugas"), update_transaksi);

export default router;