import Kendaraan from "../models/kendaraan_model.js";

export const get_semua_kendaraan = async(req, res) =>{
    try {
        const response = await Kendaraan.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const get_kendaraan = async(req, res) =>{
    try {
        const response = await Kendaraan.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const tambah_kendaraan = async(req, res) =>{
    try {
        await Kendaraan.create(req.body);
        res.status(201).json({msg: "Kendaraan ditambahkan."});
    } catch (error) {
        console.log(error.message);
    }
}