const {Sequelize} = require('sequelize');
const config = require("../config/config");
const bcrypt = require("bcrypt");
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql'
});

const seedUsers = async () => {
    try {
        await sequelize.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    failed_attempts INT DEFAULT 0,
    locked BOOLEAN DEFAULT FALSE,
    createdAt DATETIME(3) NULL,
    updatedAt DATETIME(3) NULL
)`);

        if((await sequelize.query(`Select username from users where username = 'eniya@gmail.com'`))[0].length === 0)
            await sequelize.query(`INSERT INTO users (username, password) VALUES('eniya@gmail.com', '${await bcrypt.hash('password123', 10)}')`);
    }catch(e){
        console.log(e);
    }
};

module.exports = seedUsers;
