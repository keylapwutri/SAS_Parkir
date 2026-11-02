import Kendaraan from "../models/kendaraan_model.js";

export const get_semua_kendaraan = async(req, res) =>{
    try {
        const response = await Kendaraan.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}