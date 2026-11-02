import { Sequelize } from "sequelize";

import database from "../config/database.js";

const {DataTypes} = Sequelize;

const Pengguna = database.define('tb_pengguna', {
    id_pengguna : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    nama_lengkap : {
        type : DataTypes.STRING,
        allowNull : false
    },
    nama_pengguna : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull: false
    },
    role : {
        type : DataTypes.ENUM('admin', 'petugas', 'owner'),
        defaultValue : 'petugas',
    },
    status_aktif : {
        type : DataTypes.BOOLEAN
    }
}, {
    freezeTableName : true,
    timestamps: false
});

export default Pengguna;

(async()=>{
    await database.sync({alter: false});
})();