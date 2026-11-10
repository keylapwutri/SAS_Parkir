import { Sequelize } from "sequelize";

import database from "../config/database.js";

const {DataTypes} = Sequelize;

const Transaksi = database.define('tb_transaksi', {
    id_parkir : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    id_kendaraan : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    id_area : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    waktu_masuk : {
        type : DataTypes.DATE,
        allowNull: false,
        defaultValue : DataTypes.NOW
    },
    waktu_keluar : {
        type : DataTypes.DATE,
        allowNull: true
    },
    id_tarif : {
        type : DataTypes.INTEGER,
        allowNull: false,
    },
    durasi : {
        type : DataTypes.INTEGER,
        allowNull: true,
    },
    tarif_total : {
        type : DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    status_transaksi : {
        type : DataTypes.ENUM('masuk', 'selesai'),
        allowNull : false,
        defaultValue : 'masuk'
    },
    tanggal : {
        type : DataTypes.DATEONLY,
        allowNull : false,
        defaultValue : DataTypes.NOW
    }
}, {
    freezeTableName : true,
    timestamps: false
});

export default Transaksi;

(async()=>{
    await database.sync({alter: false});
})();