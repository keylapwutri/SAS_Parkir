import express from 'express';
import { get_pengguna, get_semua_pengguna, hapus_pengguna, tambah_pengguna, update_pengguna } from '../controllers/pengguna_control.js';
import { login } from '../controllers/login_control.js'

const router = express.Router();

router.get('/pengguna', get_semua_pengguna)
router.get('/pengguna/:id', get_pengguna)
router.post('/pengguna', tambah_pengguna)
router.post('/login', login)
router.patch('/pengguna/:id', update_pengguna)
router.delete('/pengguna/:id', hapus_pengguna)

export default router