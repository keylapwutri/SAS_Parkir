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
                id_tarif: req.params.id
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

export const update_tarif = async(req, res) =>{
    try {
        await Tarif.update(req.body, {
            where: {
                id_tarif: req.params.id
            }
        });
        res.status(200).json({msg: "Tarif diperbarui."});
    } catch (error) {
        console.log(error.message);

        res.status(400).json({
            msg: "Gagal memperbarui tarif.",
            error: error.message
        });
    }
}

export const hapus_tarif = async(req, res) => {
    try{
        await Tarif.destroy({
            where:{
                id_tarif: req.params.id
            }
        });
        res.status(201).json({msg: "tarif berhasil dihapus."});
    }
    catch (error) {
        console.log(error.message);

        res.status(400).json({
            msg: "gagal menghapus area.",
            error: error.message
        })
    }
}