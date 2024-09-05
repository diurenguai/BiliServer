var express = require('express');
var router = express.Router();
var getData = require('../controller/video.js')

//获取轮播图
router.get('/getCarousel', getData.getCarousel)
    //获取首页视频页信息
router.get('/getVideo', getData.getVideo)
    //获取视频详情页信息
router.get('/getDetail/:id', getData.getDetail)
    //获取用户资料
router.get('/getUsers/:id', getData.getUsers)
    //获取视频评论
router.get('/getCommentByvideo/:id', getData.getCommentByvideo)
// router.get('/getCommentByuser/:id', getData.getCommentByuser)
    //获取用户投稿视频
router.get('/getVideoByuser/:id', getData.getVideoByuser)

router.get('/getDanmakuByvideo/:id', getData.getDanmakuByvideo)

module.exports = router;