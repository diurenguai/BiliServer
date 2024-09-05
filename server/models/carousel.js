// 引入Sequelize模块
const Sequelize = require('sequelize');

// 引入数据库实例
const db = require('../util/db');

// 定义model
const carousel = db.define('carousel', {
    id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    img: { type: Sequelize.STRING(200), allowNull: false },
    title: { type: Sequelize.STRING(45), allowNull: false },
    backgroundColor: { type: Sequelize.STRING(45), allowNull: false }
}, {
    // 是否支持驼峰
    underscored: true,
    // MySQL数据库表名
    tableName: 'carousel',
});
// 导出model
module.exports = carousel;