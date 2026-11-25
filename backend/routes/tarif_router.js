import express from 'express';
import { get_semua_tarif, get_tarif, hapus_tarif, tambah_tarif, update_tarif } from '../controllers/tarif_control.js';
import { allowRole, verifyToken } from '../services/auth.js';

const router = express.Router();

router.get('/tarif', verifyToken, get_semua_tarif);
router.get('/tarif/:id', verifyToken, get_tarif);
router.post('/tarif', verifyToken, allowRole("admin"), tambah_tarif);
router.patch('/tarif/:id', verifyToken, allowRole("admin"), update_tarif);
router.delete('/tarif/:id', verifyToken, allowRole("admin"), hapus_tarif);

export default router