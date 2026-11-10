import express from 'express';
import { get_pengguna, get_semua_pengguna, tambah_pengguna } from '../controllers/pengguna_control.js';
import { login } from '../controllers/login_control.js'

const router = express.Router();

router.get('/pengguna', get_semua_pengguna);
router.get('/pengguna/:id', get_pengguna)
router.post('/pengguna', tambah_pengguna)
router.post('/login', login)

export default router