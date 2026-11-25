import express from 'express';
import { get_pengguna, get_semua_pengguna, hapus_pengguna, tambah_pengguna, update_pengguna } from '../controllers/pengguna_control.js';
import { allowRole, verifyToken } from '../services/auth.js';

const router = express.Router();

router.get('/pengguna', verifyToken, get_semua_pengguna)
router.get('/pengguna/:id',verifyToken, get_pengguna)
router.post('/pengguna', verifyToken, allowRole("admin"), tambah_pengguna)
router.patch('/pengguna/:id', verifyToken, allowRole("admin"), update_pengguna)
router.delete('/pengguna/:id', verifyToken, allowRole("admin"), hapus_pengguna)

export default router