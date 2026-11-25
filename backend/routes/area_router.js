import express from 'express';
import { get_area, get_semua_area, hapus_area, tambah_area, update_area } from '../controllers/area_control.js';
import { allowRole, verifyToken } from '../services/auth.js';

const router = express.Router();

router.get('/area', verifyToken, get_semua_area);
router.get('/area/:id', verifyToken, get_area);
router.post('/area', verifyToken, allowRole("admin"), tambah_area);
router.patch('/area/:id', verifyToken, allowRole("admin"), update_area);
router.delete('/area/:id', verifyToken, allowRole("admin"), hapus_area);

export default router