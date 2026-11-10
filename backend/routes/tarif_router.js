import express from 'express';
import { get_semua_tarif, tambah_tarif } from '../controllers/tarif_control.js';

const router = express.Router();

router.get('/tarif', get_semua_tarif);
router.post('/tarif', tambah_tarif);

export default router