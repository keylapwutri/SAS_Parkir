import { Sequelize } from "sequelize";

import database from "../config/database.js";

const {DataTypes} = Sequelize;

const Kendaraan = database.define('tb_kendaraan', {
    id_kendaraan : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    nomor_polisi : {
        type : DataTypes.STRING,
        allowNull : false
    },
    jenis_kendaraan : {
        type : DataTypes.ENUM('mobil', 'motor', 'lainnya'),
        allowNull : false
    }
}, {
    freezeTableName : true,
    timestamps: false
});

export default Kendaraan;

(async()=>{
    await database.sync({alter: false});
})();