import express from 'express';
import { get_semua_kendaraan, get_kendaraan, tambah_kendaraan, update_kendaraan, hapus_kendaraan } from '../controllers/kendaraan_control.js';

const router = express.Router();

router.get('/kendaraan', get_semua_kendaraan);
router.get('/kendaraan/:id', get_kendaraan);
router.post('/kendaraan', tambah_kendaraan);
router.patch('/kendaraan/:id', update_kendaraan);
router.delete('/kendaraan/:id', hapus_kendaraan);

export default router