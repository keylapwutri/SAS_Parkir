import Log_aktivitas from "../models/log_model.js";
import Pengguna from "../models/pengguna_model.js";

export const get_log = async (req, res) => {
    try {

        const data = await Log_aktivitas.findAll({
            include: [
                {
                    model: Pengguna,
                    as: "pengguna",
                    attributes: ["nama_pengguna", "nama_lengkap", "role"],
        
                }
            ],
            order: [
                ["createdAt", "DESC"]
            ]
        });

        res.json(data);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};