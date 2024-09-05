const usersModel = require('../models/user');
const videoModel = require('../models/video');
const commentModel = require('../models/comment');
const Constant = require('../util/constant');
const Common = require('../util/utilMethod');

// 导出函数
let exportObj = {
    changeLike,
    changeUserLike,
    addComment
};

module.exports = exportObj;

/**
 * 更新视频的喜欢数量
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
async function changeLike(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    const { id, isAdd } = req.body;

    try {
        // 查找视频
        const video = await videoModel.findOne({ where: { id } });
        if (!video) {
            return res.status(404).json({ ...Constant.DEFAULT_ERROR, message: 'Video not found' });
        }

        // 更新喜欢数量
        let newLikeCount = video.likes + (isAdd ? 1 : -1);
        await videoModel.update({ likes: newLikeCount }, { where: { id } });

        resObj.data = newLikeCount;
        return res.status(200).json(resObj);

    } catch (err) {
        console.error(err);
        return res.status(500).json(Constant.DEFAULT_ERROR);
    }
}

/**
 * 更新用户的喜欢列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
async function changeUserLike(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    const { id, arrLike } = req.body;

    try {
        // 更新用户的喜欢列表
        const result = await usersModel.update({ like: arrLike }, { where: { id } });
        resObj.data = result;
        return res.status(200).json(resObj);

    } catch (err) {
        console.error(err);
        return res.status(500).json(Constant.DEFAULT_ERROR);
    }
}

/**
 * 添加评论
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
async function addComment(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    const { video_id, user_id, talk } = req.body;

    try {
        // 创建新评论
        const result = await commentModel.create({ video_id, user_id, talk });
        resObj.data = result;
        return res.status(201).json(resObj);

    } catch (err) {
        console.error(err);
        return res.status(500).json(Constant.DEFAULT_ERROR);
    }
}
