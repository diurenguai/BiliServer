// models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 导入模型
db.User = require('./user')(sequelize, Sequelize);

module.exports = db;
