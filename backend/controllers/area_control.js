import Area from "../models/area_model.js";

export const get_semua_area = async(req, res) =>{
    try {
        const response = await Area.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}