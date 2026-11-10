import Pengguna from "./pengguna_model.js";

import Area from "./area_model.js";
import Tarif from "./tarif_model.js";
import Kendaraan from "./kendaraan_model.js";

import Transaksi from "./transaksi_model.js";
import Log_aktivitas from "./log_model.js";

Pengguna.hasMany(Log_aktivitas, {
    foreignKey: "id_pengguna",
    as: "aktivitas"
});

Log_aktivitas.belongsTo(Pengguna, {
    foreignKey: "id_pengguna",
    as: "pengguna"
});


Tarif.hasMany(Transaksi, {
    foreignKey: "id_tarif",
    as: "transaksi"
});
Transaksi.belongsTo(Tarif, {
    foreignKey: "id_tarif",
    as: "tarif"
});

Area.hasMany(Transaksi, {
    foreignKey: "id_area",
    as: "transaksi"
});
Transaksi.belongsTo(Area,{
    foreignKey: "id_area",
    as: "area"
})

Kendaraan.hasMany(Transaksi, {
    foreignKey: "id_kendaraan",
    as: "transaksi"
});
Transaksi.belongsTo(Kendaraan, {
    foreignKey: "id_kendaraan",
    as: "kendaraan"
});