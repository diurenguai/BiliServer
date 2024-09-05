// 定义一个对象
const obj = {
    // 默认请求成功
    DEFAULT_SUCCESS: {
        code: 10000,
        msg: ''
    },
    // 默认请求失败
    DEFAULT_ERROR: {
        code: 188,
        msg: '出现错误'
    },
    // 定义错误返回-缺少必要参数
    LACK: {
        code: 199,
        msg: '缺少必要参数'
    },
    TOKEN_ERROR: {
        code: 401,
        msg: 'Token验证失败'
    },
    // 定义错误返回-用户名或密码错误
    LOGIN_ERROR: {
        code: 101,
        msg: '用户名或密码错误'
    },
    REGISTER_ERROR: {
        code: 102,
        msg: '该用户名已存在'
    },
    VERFICATION_ERROR: {
        code: 103,
        msg: '数据校验失败'
    }
};
// 导出对象，给其他方法调用
module.exports = obj;