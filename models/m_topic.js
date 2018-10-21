//话题页数据库

//导入数据库数据
const db = require('../tools/db_config');

exports.findAllTopic= (callback) =>{
    //查询数据库
    const sqlstr = 'select * from topics order by createdAt desc';
    db.query(sqlstr,(err, data) => {
        if(err) {
            return callback(err)
        }
        callback(null, data)
    })
}

//向数据库中增加新话题 body
exports.addTopic = (body, callback) => {
    const sqlstr ='insert into topics set ?';
    db.query(sqlstr,body,(err,data) => {
        if(err) {
            return callback(err)
        }
        callback(null,data)
    })
}

//渲染编辑话题
exports.findTopicByID=(topicID, callback) => {
    const sqlstr='select *from topics where id=?';
    db.query(sqlstr,topicID,(err, data)=> {
        if(err) {
            return callback(err)
        }
        callback(null,data)
    })
}

// 处理编辑页
exports.updateTopicByID=(topicID,body,callback)=>{
    const sql = 'update topics set title=?, content=? where id=?';
    db.query(sql, [
        body.title,
        body.content,
        topicID
    ],(err, data) => {
        if(err){
            return callback(err)
        }
        callback(null,data)
    })
}


//删除
exports.deleteTopicByID=(topicID,callback)=>{
    const sqlstr ='delete from topics where id = ?';
    console.log(topicID)
    db.query(sqlstr,topicID,(err, data)=> {

        if(err) {
            console.log(err)
            return callback(err)
        }
        callback(null,data)
    })
}
