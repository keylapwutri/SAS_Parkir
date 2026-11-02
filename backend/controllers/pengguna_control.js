import Pengguna from "../models/pengguna_model.js";

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
        await Pengguna.create(req.body);
        res.status(201).json({msg: "Pengguna ditambahkan."})
    } catch (error) {
        console.log(error.message);
    }
}