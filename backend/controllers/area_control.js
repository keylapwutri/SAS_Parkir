import Area from "../models/area_model.js";

export const get_semua_area = async(req, res) =>{
    try {
        const response = await Area.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const get_area = async(req, res) =>{
    try {
        const response = await Area.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const tambah_area = async(req, res) =>{
    try {
        await Area.create(req.body);
        res.status(201).json({msg: "Area ditambahkan."});
    } catch (error) {
        console.log(error.message);
    }
}