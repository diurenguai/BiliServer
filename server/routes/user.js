var express = require('express');
var router = express.Router();
var expressJoi = require('@escook/express-joi')

var user = require('../controller/user.js')
var middleware = require('../util/middleware')
var { reg_schema,login_schema } = require('../util/verification')

//登录
router.post('/login', expressJoi(login_schema), user.userLogin)
    //注册
router.post('/register', expressJoi(reg_schema), user.userRegister)
    //浏览量加一
router.post('/addView', user.addView)
    //需要登录权限的功能
router.use('/', middleware.checkUser, require('./userNeedCheck'))

module.exports = router;