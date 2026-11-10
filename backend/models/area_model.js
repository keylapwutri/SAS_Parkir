import { Sequelize } from "sequelize";

import database from "../config/database.js";

const {DataTypes} = Sequelize;

const Area = database.define('tb_area', {
    id_area : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    nama_area : {
        type : DataTypes.STRING,
        allowNull : false
    },
    kapasitas : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    terisi : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    status : {
        type : DataTypes.BOOLEAN,
        defaultValue : 1,
    }
}, {
    freezeTableName : true,
    timestamps: false
});

export default Area;

(async()=>{
    await database.sync({alter: false});
})();