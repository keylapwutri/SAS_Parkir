import express from 'express';
import { get_semua_kendaraan, get_kendaraan, tambah_kendaraan, update_kendaraan, hapus_kendaraan } from '../controllers/kendaraan_control.js';
import { allowRole, verifyToken } from '../services/auth.js';

const router = express.Router();

router.get('/kendaraan', verifyToken, get_semua_kendaraan);
router.get('/kendaraan/:id', verifyToken, get_kendaraan);
router.post('/kendaraan', verifyToken, allowRole("admin", "petugas"), tambah_kendaraan);
router.patch('/kendaraan/:id',verifyToken, allowRole("admin"), update_kendaraan);
router.delete('/kendaraan/:id', verifyToken, allowRole("admin"), hapus_kendaraan);

export default router