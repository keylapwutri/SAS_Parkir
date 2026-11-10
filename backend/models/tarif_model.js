import { Sequelize } from "sequelize";

import database from "../config/database.js";

const {DataTypes} = Sequelize;

const Tarif = database.define('tb_tarif', {
    id_tarif : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    jenis_kendaraan : {
        type : DataTypes.ENUM('mobil', 'motor', 'lainnya'),
        allowNull : false
    },
    biaya_tarif : {
        type : DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    tarif_maksimal : {
        type : DataTypes.DECIMAL(10, 2),
        allowNull : false
    }
}, {
    freezeTableName : true,
    timestamps: false
});

export default Tarif;

(async()=>{
    await database.sync({alter: false});
})();