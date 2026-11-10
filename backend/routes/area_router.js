import express from 'express';
import { get_semua_area, tambah_area } from '../controllers/area_control.js';

const router = express.Router();

router.get('/area', get_semua_area);
router.post('/area', tambah_area);

export default router