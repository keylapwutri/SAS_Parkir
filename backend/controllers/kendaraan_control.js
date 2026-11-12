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
                id_kendaraan: req.params.id
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

export const update_kendaraan = async(req, res) =>{
    try {
        await Kendaraan.update(req.body, {
            where: {
                id_kendaraan: req.params.id
            }
        });
        res.status(200).json({msg: "Kendaraan diperbarui."});
    } catch (error) {
        console.log(error.message);

        res.status(400).json({
            msg: "Gagal memperbarui kendaraan.",
            error: error.message
        });
    }
}

export const hapus_kendaraan = async(req, res) => {
    try{
        await Kendaraan.destroy({
            where:{
                id_kendaraan: req.params.id
            }
        });
        res.status(201).json({msg: "kendaraan berhasil dihapus."});
    }
    catch (error) {
        console.log(error.message);

        res.status(400).json({
            msg: "gagal menghapus kendaraan.",
            error: error.message
        })
    }
}