import Transaksi from "../models/transaksi_model.js";
import Tarif from "../models/tarif_model.js";
import { hitung_tarif } from "../services/tarif_service.js";

export const get_semua_transaksi = async(req, res) =>{
    try {
        const response = await Transaksi.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

/*const hasil = hitung_tarif(
    Transaksi.waktu_masuk,
    new Date(),
    Tarif.tarif,
    Tarif.tarif_maksimal
);

await Transaksi.update({
    waktu_keluar: new Date(),
    durasi: hasil.durasi,
    tarif_total: hasil.tarif_total
});*/