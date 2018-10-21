//数据库

//导入数据库配置的模块
const db = require('../tools/db_config');

// 1 验证邮箱
const checkEmail = function(email,callback){
    const sqlstr = 'select * from users where email=?';
    //函数内部异步操作
    db.query(sqlstr,email,(err, data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
}

//验证昵称
exports.checkNickname = (nickname, callback)=>{
    const sqlstr = 'select * from users where nickname=?';
    db.query(sqlstr, nickname,(err, data) => {
        if(err) {
            return callback(err)
        }
        callback(null, data)
    })
}

//添加新用户
exports.addUser = (body, callback) => {
    const sqlstr ='insert into users set?';
    db.query(sqlstr, body, (err, data) => {
        if(err) {
            return callback(err)
        }
        callback(null,data)
    })
}


//导出
exports.checkEmail = checkEmail;