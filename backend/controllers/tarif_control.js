import Tarif from "../models/tarif_model.js";

export const get_semua_tarif = async(req, res) =>{
    try {
        const response = await Tarif.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const get_tarif = async(req, res) =>{
    try {
        const response = await Tarif.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const tambah_tarif = async(req, res) => {
    try {
        await Tarif.create(req.body);
        res.status(201).json({msg: "Tarif ditambahkan."});
    }
    catch(error) {
        console.log(error.message);
    }
}