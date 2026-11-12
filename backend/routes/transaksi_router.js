import express from 'express';
import { get_semua_transaksi, get_transaksi } from '../controllers/transaksi_control.js'; 

const router = express.Router();

router.get('/transaksi', get_semua_transaksi);
router.get('/transaksi/:id', get_transaksi);

export default router