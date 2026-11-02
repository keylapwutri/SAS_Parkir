import Tarif from "../models/tarif_model.js";

export const get_semua_tarif = async(req, res) =>{
    try {
        const response = await Tarif.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}