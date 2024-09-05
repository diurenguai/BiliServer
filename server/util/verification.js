//导入joi包
const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(6).max(20).required();

// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,40}$/).required();

// 昵称的验证规则
const nickname = joi.string().min(3).max(30).required();

// 电子邮件的验证规则
const id = joi.number().integer().positive().required();

// 注册表单的验证规则对象
exports.reg_schema = {
    body: {
        username,
        password,
        nickname,
        id
    },
};

// 登录表单的验证规则对象
exports.login_schema = {
    body: {
        username,
        password,
    },
};
