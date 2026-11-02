import express from 'express';
import { get_semua_transaksi } from '../controllers/transaksi_control.js'; 

const router = express.Router();

router.get('/transaksi', get_semua_transaksi);

export default router