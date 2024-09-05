// 引入Sequelize模块
const Sequelize = require('sequelize');

// 引入数据库实例
const db = require('../util/db');

// 定义model
const video = db.define('video', {
    id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    title: { type: Sequelize.STRING(40), allowNull: false },
    up: { type: Sequelize.BIGINT, allowNull: false },
    img: { type: Sequelize.STRING(200), allowNull: false },
    views: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    likes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    stars: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    shares: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    coins: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    link: { type: Sequelize.STRING(300), defaultValue: 'http://vali-g1.cp31.ott.cibntv.net/youku/697446c85e14171c789dd2e19/030008010063EEE4E2010BE212B6CF96302AC3-4F0C-4E1C-85EC-C1951BACD94D.mp4?sid=167929725600010003194_00_B18920f2dde5e01b66b0d894b111478cb&sign=1ac94b68c382fdc16544442e8a85dd94&ctype=50&si=183&psid=85ac4a01039bd75c1105687b9bec8c1b41346' },
    introduction: { type: Sequelize.STRING(1000) }
}, {
    // 是否支持驼峰
    underscored: true,
    // MySQL数据库表名
    tableName: 'video',
});
// 导出model
module.exports = video;