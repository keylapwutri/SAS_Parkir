import express from 'express';
import { get_semua_tarif, get_tarif, hapus_tarif, tambah_tarif, update_tarif } from '../controllers/tarif_control.js';

const router = express.Router();

router.get('/tarif', get_semua_tarif);
router.get('/tarif/:id', get_tarif);
router.post('/tarif', tambah_tarif);
router.patch('/tarif/:id', update_tarif);
router.delete('/tarif/:id', hapus_tarif);

export default router