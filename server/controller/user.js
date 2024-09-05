const async = require('async');
const usersModel = require('../models/user');
const Constant = require('../util/constant');
const Token = require('./token');
const Common = require('../util/utilMethod');
const TOKEN_EXPIRE_SECONDS = 3600;
async function userLogin(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    const { username, password } = req.body;

    try {
        // 检查请求参数
        Common.checkParams(req.body, ['username', 'password']);
        // 查询用户
        const user = await usersModel.findOne({
            where: { username, password }
        });
        if (!user) {
            return res.status(400).json(Constant.LOGIN_ERROR);
        }
        // 生成 Token
        const token = Token.encrypt({ id: user.id }, TOKEN_EXPIRE_SECONDS);

        resObj.data = {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            avatar: user.avatar,
            follows: user.follows,
            fans: user.fans,
            video: user.video,
            introduction: user.introduction,
            token: token
        };

        return res.status(200).json(resObj);

    } catch (err) {
        console.error(err);
        return res.status(500).json(Constant.DEFAULT_ERROR);
    }
}

// 添加视频观看次数
async function addView(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    const { id } = req.body;

    try {
        // 检查请求参数
        Common.checkParams(req.body, ['id']);

        // 查询视频
        const video = await videoModel.findOne({ where: { id } });

        if (!video) {
            return res.status(404).json(Constant.VIDEO_NOT_FOUND_ERROR);
        }

        // 更新观看次数
        video.views++;
        await video.save();

        resObj.data = video.views;
        return res.status(200).json(resObj);

    } catch (err) {
        console.error(err);
        return res.status(500).json(Constant.DEFAULT_ERROR);
    }
}
// 定义 userRegister 函数
async function userRegister(req, res) {

    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    const { nickname, username, password, id } = req.body;

    try {
        // 检查请求参数
        Common.checkParams(req.body, ['username', 'password']);

        // 检查用户名是否已存在
        const existingUser = await usersModel.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ ...Constant.REGISTER_ERROR });
        }
        // 创建新用户
        const newUser = await usersModel.create({ nickname, username, password,id});
        resObj.data = newUser;

        // 返回成功响应
        return res.status(201).json(resObj);
    } catch (err) {
        // 处理错误
        console.error('Registration Error:', {
            message: err.message,
            stack: err.stack,
            details: err
        });

        const errorResponse = err.message ? { ...Constant.DEFAULT_ERROR, message: err.message } : Constant.DEFAULT_ERROR;
        return res.status(500).json(errorResponse);
    }
}




// 使用 userRegister 函数


// 导出
let exportObj = {
    userLogin,
    userRegister,
    addView
};

module.exports = exportObj;
