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
                id_area: req.params.id
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

export const update_area = async(req, res) =>{
    try {
        await Area.update(req.body, {
            where: {
                id_area: req.params.id
            }
        });
        res.status(200).json({msg: "Area diperbarui."});
    } catch (error) {
        console.log(error.message);

        res.status(400).json({
            msg: "Gagal memperbarui area.",
            error: error.message
        });
    }
}

export const hapus_area = async(req, res) => {
    try{
        await Area.destroy({
            where:{
                id_area: req.params.id
            }
        });
        res.status(201).json({msg: "area berhasil dihapus."});
    }
    catch (error) {
        console.log(error.message);

        res.status(400).json({
            msg: "gagal menghapus area.",
            error: error.message
        })
    }
}