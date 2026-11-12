import express from 'express';
import { get_area, get_semua_area, hapus_area, tambah_area, update_area } from '../controllers/area_control.js';

const router = express.Router();

router.get('/area', get_semua_area);
router.get('/area/:id', get_area);
router.post('/area', tambah_area);
router.patch('/area/:id', update_area);
router.delete('/area/:id', hapus_area);

export default router