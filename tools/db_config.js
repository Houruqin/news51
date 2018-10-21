// 导包
const mysql = require('mysql');

//登录页mysql相关操作
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'news51'
});

//话题页mysql


module.exports = db;