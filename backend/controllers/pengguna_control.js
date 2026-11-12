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
                id_pengguna: req.params.id
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

export const update_pengguna = async (req, res) => {
    try {
        const {
            nama_lengkap,
            nama_pengguna,
            password,
            role,
            status_aktif
        } = req.body;

        const pengguna = await Pengguna.findByPk(req.params.id);

        if (!pengguna) {
            return res.status(404).json({
                msg: "Pengguna tidak ditemukan."
            });
        }

        const dataUpdate = {};

        if (nama_lengkap !== undefined)
            dataUpdate.nama_lengkap = nama_lengkap;

        if (nama_pengguna !== undefined)
            dataUpdate.nama_pengguna = nama_pengguna;

        if (password !== undefined)
            dataUpdate.password = await bcrypt.hash(password, 10);

        if (role !== undefined)
            dataUpdate.role = role;

        if (status_aktif !== undefined)
            dataUpdate.status_aktif = status_aktif;

        await pengguna.update(dataUpdate);

        res.status(200).json({
            msg: "Pengguna berhasil diperbarui."
        });

    } catch (error) {
        console.log(error);

        res.status(400).json({
            msg: "Gagal memperbarui pengguna.",
            error: error.message
        });
    }
};

export const hapus_pengguna = async(req, res) => {
    try{
        await Pengguna.destroy({
            where:{
                id_pengguna: req.params.id
            }
        });
        res.status(201).json({msg: "pengguna berhasil dihapus."});
    }
    catch (error) {
        console.log(error.message);

        res.status(400).json({
            msg: "gagal menghapus pengguna.",
            error: error.message
        })
    }
}