import Pengguna from "../models/pengguna_model.js";
import bcrypt from "bcrypt"

export const get_semua_pengguna = async(req, res) =>{
    try {
        const response = await Pengguna.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const get_pengguna = async(req, res) =>{
    try {
        const response = await Pengguna.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const tambah_pengguna = async(req, res) => {
    try {
        const {
            nama_lengkap,
            nama_pengguna,
            password,
            role,
            status_aktif
        } = req.body;

        const cekPengguna = await Pengguna.findOne({
            where: { nama_pengguna }
        });

        if (cekPengguna) {
            return res.status(400).json({
                message: "Username sudah digunakan!"
            });
        }

        const saltRounds = 10;
        
        const passwordHash = await bcrypt.hash(
            password,
            saltRounds
        );

        await Pengguna.create({
            nama_lengkap,
            nama_pengguna,
            password: passwordHash,
            role,
            status_aktif
        });
        res.status(201).json({msg: "Pengguna ditambahkan."})

    } catch (error) {
        console.log(error.message);
    }
}