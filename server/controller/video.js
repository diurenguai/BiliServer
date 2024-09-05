// 引入model实例
const carouselModel = require('../models/carousel');
const videoModel = require('../models/video');
const usersModel = require('../models/user');
const commentModel = require('../models/comment');

const Common = require('../util/utilMethod')
const moment = require('moment');
const Constant = require('../util/constant');

module.exports = {
    getCarousel,
    getVideo,
    getDetail,
    getUsers,
    getCommentByvideo,
    getVideoByuser,
    getDanmakuByvideo,
};

async function getCarousel(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    try {
        const result = await carouselModel.findAll({
            limit: 4,
            order: [['id', 'DESC']],
        });

        const list = result.map(v => ({
            id: v.id,
            img: v.img,
            title: v.title,
            backgroundColor: v.backgroundColor
        }));

        resObj.data = { list };
        res.json(resObj);
    } catch (err) {
        console.error(err);
        res.status(500).json(Constant.DEFAULT_ERROR);
    }
}

async function getVideo(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    try {
        const videos = await videoModel.findAll({
            offset: parseInt(req.query.offset, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 4,
            order: [['id', 'ASC']],
        });

        const list = await Promise.all(videos.map(async v => {
            const { count: Commentcount } = await commentModel.findAndCountAll({ where: { video_id: v.id } });
            const user = await usersModel.findOne({ where: { id: v.up } });

            return {
                id: v.id,
                title: v.title,
                up: v.up,
                img:  v.img,
                views: v.views,
                likes: v.likes,
                stars: v.stars,
                shares: v.shares,
                coins: v.coins,
                link: v.link,
                introduction: v.introduction,
                viewsChange: Common.numChange(v.views),
                likesChange: Common.numChange(v.likes),
                starsChange: Common.numChange(v.stars),
                sharesChange: Common.numChange(v.shares),
                coinsChange: Common.numChange(v.coins),
                commentCount: Commentcount,
                // nickname: user.nickname,
                nickname: user ? user.nickname : 'Unknown', // 处理 null 值
            };
        }));

        resObj.data = list;
        res.json(resObj);
    } catch (err) {
        console.error(err);
        res.status(500).json(Constant.DEFAULT_ERROR);
    }
}

async function getDetail(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    try {
        const video = await videoModel.findOne({ where: { id: req.params.id } });
        const { count: Commentcount } = await commentModel.findAndCountAll({ where: { video_id: video.id } });
        const user = await usersModel.findOne({ where: { id: video.up } });

        const obj = {
            id: video.id,
            title: video.title,
            up: video.up,
            img: video.img,
            views: video.views,
            likes: video.likes,
            stars: video.stars,
            shares: video.shares,
            coins: video.coins,
            link: video.link,
            introduction: video.introduction,
            viewsChange: Common.numChange(video.views),
            likesChange: Common.numChange(video.likes),
            starsChange: Common.numChange(video.stars),
            sharesChange: Common.numChange(video.shares),
            coinsChange: Common.numChange(video.coins),
            commentCount: Commentcount,
            nickname: user.nickname,
            avatar: user.avatar,
            followsChange: Common.numChange(user.follows),
            fansChange: Common.numChange(user.fans),
            introduction: user.introduction,
            createdAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss')
        };

        resObj.data = obj;
        res.json(resObj);
    } catch (err) {
        console.error(err);
        res.status(500).json(Constant.DEFAULT_ERROR);
    }
}

async function getUsers(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    try {
        // 从 req.params 中提取用户 ID
        let userId = req.params.id;  // 确保与你的路由参数一致
        console.log(req.params.id);
        userId = parseInt(userId, 10);
      
        // 确保 ID 是有效的
        if (!userId) {
            return res.status(400).json({
                ...Constant.DEFAULT_ERROR,
                message: 'Invalid user ID'
            });
        }

        // console.log(typeof userId);  // 输出 userId 的类型

        // 查找用户
        const user = await usersModel.findOne({ where: { id: userId } });
        // console.log(user);

        // 检查用户是否存在
        if (!user) {
            return res.status(404).json({
                ...Constant.DEFAULT_ERROR,
                message: 'User not found'
            });
        }

        // 清空用户密码（如果必要）
        user.password = '';

        // 设置返回的数据
        resObj.data = user;

        // 发送响应
        res.json(resObj);
    } catch (err) {
        // 记录错误
        console.error('Error in getUsers:', err);

        // 发送错误响应
        res.status(500).json({
            ...Constant.DEFAULT_ERROR,
            message: 'Internal Server Error'
        });
    }
}


async function getCommentByvideo(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    try {
        // console.log( req.params.id)
        const result = await commentModel.findAndCountAll({
            where: { video_id: req.params.id },
            order: [['created_at', 'DESC']],
        });

        resObj.data = { result };
        res.json(resObj);
    } catch (err) {
        console.error(err);
        res.status(500).json(Constant.DEFAULT_ERROR);
    }
}

async function getVideoByuser(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    try {
        const result = await videoModel.findAndCountAll({
            where: { up: req.params.id },
            order: [['created_at', 'DESC']],
        });

        resObj.data = { result };
        res.json(resObj);
    } catch (err) {
        console.error(err);
        res.status(500).json(Constant.DEFAULT_ERROR);
    }
}
async function getDanmakuByvideo(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    try {
        const result = await videoModel.findAndCountAll({
            where: { up: req.params.id },
            order: [['created_at', 'DESC']],
        });

        resObj.data = { result };
        res.json(resObj);
    } catch (err) {
        console.error(err);
        res.status(500).json(Constant.DEFAULT_ERROR);
    }
}

       
