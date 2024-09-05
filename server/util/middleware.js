const Token = require('../controller/token');
const Constant = require('../util/constant');

const exportObj = {
    checkUser,

};

module.exports = exportObj;

function checkUser(req, res, next) {
    let token = req.headers.token;
    let tokenVerifyObj = Token.decrypt(token);
    if (tokenVerifyObj.token) {
        next()
    } else {
        res.json(Constant.TOKEN_ERROR)
    }
}