//导入
const m_topic = require('../models/m_topic');
const moment = require('moment');

//渲染话题页面
exports.showTopic = (req, res) =>{
    m_topic.findAllTopic((err, data) => {
        if(err) {
            return next(err)
        }

     //登录成功后渲染html,并将数据传递给header.html
     res.render('index.html',{
         topics:data,
         user:req.session.user
     })
     
    })
};

//渲染发布新话题
exports.createTopic = (req, res) => {
    res.render('topic/create.html');
};

//处理发布新话题表单
exports.handleCreateTopic = (req, res) => {
    //获取表单数据
    const body = req.body;
    //给body设置时间
    body.createdAt =moment().format();

    //设置用户id
    body.userId = req.session.user.id;
    //    console.log(body)
    //将body中的数据增加到数据库中，成功返回响应
    m_topic.addTopic(body, (err, data) => {
        //操作数据库
        if(err) {
            return next(err)
        }
        //执行到此处，表示数据库中有数据，添加数据成功，返回结果
        res.send({
            code:200,
            message:'发布成功'
        })

    })
}

//渲染话题详情页
exports.showDetail =(req, res) => {
   //根据当前话题的 id 值 topicId 去数据库寻找数据，并将结果返回
  const topicID = req.params.topicID;

   m_topic.findTopicByID(topicID, (err,data) => {
        if(err) {
            return res.send({
                code:500,
                message:'服务器又错了'
            })
        }
        //渲染页面
        res.render('topic/show.html', {
            topic: data[0]
        })
   }) 
    
}

//渲染编辑话题
exports.showEdit=(req, res) => {
  const topicID = req.params.topicID;
  m_topic.findTopicByID(topicID, (err, data) => {
    //   console.log(data)
      if(err) {
          return next(err)
      }
      res.render('topic/edit.html',{
          topic:data[0]
      })
  })
    
}

//处理编辑话题
exports.handleEdit=(req, res) => {
    const body = req.body;
    const topicID = req.params.topicID;
    m_topic.updateTopicByID( topicID, body,(err, data) => {
        if(err) {
            return next(err)
        }
        res.send({
            code:200,
            message:'修改成功'
        })
    })
}


//删除
exports.deleteTopic=(req, res)=> {
    const topicID = req.params.topicID;
    m_topic.deleteTopicByID(topicID,(err,data) => {
        if(err) {
            return next(err)
        }
        res.send({
            code:200,
            message:'删除成功'
        })
    })
}
