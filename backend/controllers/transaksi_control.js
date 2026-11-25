import database from "../config/database.js";
import Transaksi from "../models/transaksi_model.js";
import Tarif from "../models/tarif_model.js";
import Kendaraan from "../models/kendaraan_model.js";
import Area from "../models/area_model.js";
import Pengguna from "../models/pengguna_model.js";
import { hitung_tarif } from "../services/tarif_service.js";

export const get_semua_transaksi = async(req, res) =>{
    try {
        const response = await Transaksi.findAll({
            include: [
                {
                    model: Kendaraan,
                    as: "kendaraan"
                },
                {
                    model: Area,
                    as: "area"
                },
                {
                    model: Tarif,
                    as: "tarif"
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const get_transaksi = async(req, res) =>{
    try {
        const response = await Transaksi.findOne({
            where: {
                id_transaksi: req.params.id
            },
            include: [
                {
                    model: Kendaraan,
                    as: "kendaraan"
                },
                {
                    model: Area,
                    as: "area"
                },
                {
                    model: Tarif,
                    as: "tarif"
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const tambah_transaksi = async (req, res) => {
    const t = await database.transaction();

    try {
        const { id_kendaraan, id_area } = req.body;

        // Pastikan petugas sudah login
        const id_petugas = req.user?.id_pengguna;

        if (!id_kendaraan || !id_area) {
            await t.rollback();
            return res.status(400).json({
                msg: "ID kendaraan dan ID area wajib diisi."
            });
        }

        if (!id_petugas) {
            await t.rollback();
            return res.status(401).json({
                msg: "Identitas petugas tidak ditemukan."
            });
        }

        // Cek petugas
        const petugas = await Pengguna.findByPk(id_petugas, {
            transaction: t
        });

        if (!petugas || !petugas.status_aktif) {
            await t.rollback();
            return res.status(403).json({
                msg: "Petugas tidak aktif atau tidak ditemukan."
            });
        }

        // Cari kendaraan
        const kendaraan = await Kendaraan.findByPk(id_kendaraan, {
            transaction: t
        });

        if (!kendaraan) {
            await t.rollback();
            return res.status(404).json({
                msg: "Kendaraan tidak ditemukan."
            });
        }

        // Cek transaksi aktif kendaraan
        const transaksiAktif = await Transaksi.findOne({
            where: {
                id_kendaraan,
                status_transaksi: "masuk"
            },
            transaction: t
        });

        if (transaksiAktif) {
            await t.rollback();
            return res.status(400).json({
                msg: "Kendaraan masih memiliki transaksi parkir aktif."
            });
        }

        // Cari area dan kunci barisnya selama proses berlangsung
        const area = await Area.findByPk(id_area, {
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (!area) {
            await t.rollback();
            return res.status(404).json({
                msg: "Area parkir tidak ditemukan."
            });
        }

        // Cek kapasitas
        if (area.terisi >= area.kapasitas) {
            await t.rollback();
            return res.status(400).json({
                msg: "Area parkir sudah penuh."
            });
        }

        // Cari tarif sesuai jenis kendaraan
        const tarif = await Tarif.findOne({
            where: {
                jenis_kendaraan: kendaraan.jenis_kendaraan
            },
            transaction: t
        });

        if (!tarif) {
            await t.rollback();
            return res.status(404).json({
                msg: "Tarif kendaraan tidak ditemukan."
            });
        }

        // Buat transaksi masuk
        const transaksi = await Transaksi.create({
            id_kendaraan,
            id_area,
            id_tarif: tarif.id_tarif,
            waktu_masuk: new Date(),
            waktu_keluar: null,
            durasi: null,
            tarif_total: null,
            status_transaksi: "masuk",
            tanggal: new Date(),
            id_petugas_masuk: id_petugas,
            id_petugas_keluar: null,
            metode_pembayaran: null
        }, {
            transaction: t
        });

        // Tambah jumlah kendaraan di area
        await area.update({
            terisi: area.terisi + 1
        }, {
            transaction: t
        });

        await t.commit();

        return res.status(201).json({
            msg: "Transaksi kendaraan masuk berhasil.",
            data: transaksi
        });

    } catch (error) {
        await t.rollback();

        console.error(error);

        return res.status(500).json({
            msg: "Gagal membuat transaksi.",
            error: error.message
        });
    }
};

// UPDATE TRANSAKSI / KENDARAAN KELUAR
export const update_transaksi = async (req, res) => {
    const t = await database.transaction();

    try {
        const { metode_pembayaran } = req.body;

        const id_petugas = req.user?.id_pengguna;
        const id = req.params.id;

        if (!id_petugas) {
            await t.rollback();
            return res.status(401).json({
                msg: "Identitas petugas tidak ditemukan."
            });
        }

        if (!["QRIS", "Debit"].includes(metode_pembayaran)) {
            await t.rollback();
            return res.status(400).json({
                msg: "Metode pembayaran harus QRIS atau Debit."
            });
        }

        // Cari transaksi
        const transaksi = await Transaksi.findByPk(id, {
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (!transaksi) {
            await t.rollback();
            return res.status(404).json({
                msg: "Transaksi tidak ditemukan."
            });
        }

        // Pastikan transaksi belum selesai
        if (transaksi.status_transaksi !== "masuk") {
            await t.rollback();
            return res.status(400).json({
                msg: "Transaksi sudah diselesaikan sebelumnya."
            });
        }

        // Cek petugas
        const petugas = await Pengguna.findByPk(id_petugas, {
            transaction: t
        });

        if (!petugas || !petugas.status_aktif) {
            await t.rollback();
            return res.status(403).json({
                msg: "Petugas tidak aktif atau tidak ditemukan."
            });
        }

        // Ambil tarif yang digunakan saat kendaraan masuk
        const tarif = await Tarif.findByPk(transaksi.id_tarif, {
            transaction: t
        });

        if (!tarif) {
            await t.rollback();
            return res.status(404).json({
                msg: "Data tarif tidak ditemukan."
            });
        }

        // Hitung biaya parkir
        const waktuKeluar = new Date();

        const hasil = hitung_tarif(
            transaksi.waktu_masuk,
            waktuKeluar,
            tarif.biaya_tarif,
            tarif.tarif_maksimal
        );

        // Ambil area
        const area = await Area.findByPk(transaksi.id_area, {
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (!area) {
            await t.rollback();
            return res.status(404).json({
                msg: "Area parkir tidak ditemukan."
            });
        }

        // Update transaksi
        await transaksi.update({
            waktu_keluar: waktuKeluar,
            durasi: hasil.durasi,
            tarif_total: hasil.tarif_total,
            metode_pembayaran,
            id_petugas_keluar: id_petugas,
            status_transaksi: "selesai"
        }, {
            transaction: t
        });

        // Kurangi jumlah kendaraan di area
        await area.update({
            terisi: Math.max(0, area.terisi - 1)
        }, {
            transaction: t
        });

        await t.commit();

        return res.status(200).json({
            msg: "Transaksi kendaraan keluar berhasil.",
            data: {
                id_transaksi: transaksi.id_transaksi,
                waktu_masuk: transaksi.waktu_masuk,
                waktu_keluar: waktuKeluar,
                durasi: hasil.durasi,
                tarif_total: hasil.tarif_total,
                metode_pembayaran,
                status_transaksi: "selesai"
            }
        });

    } catch (error) {
        await t.rollback();

        console.error(error);

        return res.status(500).json({
            msg: "Gagal memperbarui transaksi.",
            error: error.message
        });
    }
};
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