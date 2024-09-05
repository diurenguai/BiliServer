var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // 引入 cors 中间件
var usersRouter = require('./routes/user');
var videoRouter = require('./routes/index')
var mixRouter =  require('./routes/userNeedCheck')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置 CORS
app.use(cors({
    origin: '*', // 或指定特定的前端地址，例如 'http://localhost:5173'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/users', usersRouter);
app.use('/video', videoRouter);
app.use('/mix', mixRouter);
module.exports = app;
