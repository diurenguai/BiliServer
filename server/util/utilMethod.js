// 引入async模块
const async = require('async');
// 引入常量模块
const Constant = require('./constant');

const exportObj = {
    clone,
    checkParams,
    autoFn,
    numChange
};

module.exports = exportObj;

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
//检查params是否在数据库存在
function checkParams(params, checkArr) {
    return new Promise((resolve, reject) => {
        let flag = true;

        // 遍历需要检查的字段
        checkArr.forEach(v => {
            // 如果参数中缺少某个字段，将标记设置为 false
            if (!params[v]) {
                flag = false;
            }
        });

        // 根据标记结果决定 Promise 的状态
        if (flag) {
            resolve();  // 所有字段都存在，返回成功
        } else {
            reject(Constant.LACK);  // 存在缺失字段，返回失败
        }
    });
}



function autoFn(tasks, res, resObj) {
    async.auto(tasks, function(err) {
        if (!!err) {
            console.log(JSON.stringify(err));
            res.json({
                code: err.code || Constant.DEFAULT_ERROR.code,
                msg: err.msg || JSON.stringify(err)
            });
        } else {
            res.json(resObj);
        }
    });
}


function numChange(num) {
    if (num >= 10000) {
        var n1 = Math.floor(num / 10000)
        var n2 = Math.floor((num % 10000) / 1000)
        if (n2 == 0) {
            return n1 + '万'
        } else {
            return n1 + '.' + n2 + '万'
        }
    } else {
        return num
    }
}