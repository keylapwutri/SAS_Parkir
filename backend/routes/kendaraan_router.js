import express from 'express';
import { get_semua_kendaraan } from '../controllers/kendaraan_control.js';

const router = express.Router();

router.get('/kendaraan', get_semua_kendaraan);

export default router