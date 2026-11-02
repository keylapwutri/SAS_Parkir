import { Sequelize } from "sequelize";

import database from "../config/database.js";

const {DataTypes} = Sequelize;

const Log_aktivitas = database.define('tb_log-aktivitas', {
    id_log : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    id_pengguna : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    aktivitas : {
        type : DataTypes.STRING,
        allowNull : false,
    }
}, {
    freezeTableName : true,
    createdAt: true,
    updatedAt: false
});

export default Log_aktivitas;

(async()=>{
    await database.sync({alter: false});
})();