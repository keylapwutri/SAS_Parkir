import { Sequelize } from "sequelize";

const database = new Sequelize('parkir_pk', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default database;