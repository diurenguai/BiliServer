// 引入Sequelize模块
const Sequelize = require('sequelize');

// 引入数据库实例
const db = require('../util/db');

// 定义model
const comment = db.define('comment', {
    id: { type: Sequelize.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
    video_id: { type: Sequelize.BIGINT, allowNull: false },
    user_id: { type: Sequelize.BIGINT, allowNull: false },
    talk: { type: Sequelize.STRING(1000) },
    created_at: { type: Sequelize.DATE }
}, {
    // 是否支持驼峰
    underscored: true,
    // MySQL数据库表名
    tableName: 'comment',
});
// 导出model
module.exports = comment;