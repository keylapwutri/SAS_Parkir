import Pengguna from "../models/pengguna_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { where } from "sequelize";

export const login = async(req, res) =>{
    const { nama_pengguna, password } = req.body;

    try {
        const pengguna = await pengguna.findOne({
            where: { nama_pengguna }
        })

        if (!pengguna) {
            return res.status(404).json({msg: "Pengguna tidak ditemukan"})
        }

        console.log(pengguna.toJSON())

        const match = await bcrypt.compare(password, pengguna.password);
        if (!match) {
            return res.status(404).json({msg: "Password Salah"});
        }

        const token = jwt.sign(
            {
                id_pengguna: pengguna.id_pengguna,
                nama_lengkap: pengguna.nama_lengkap,
                nama_pengguna: pengguna.nama_pengguna,
                role: pengguna.role,
                status_aktif: pengguna.status_aktif
            },
            "TOKEN_KUNCI",
            { expiresIn: "1d" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
