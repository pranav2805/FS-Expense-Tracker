const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', 'qwertyuiop', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;