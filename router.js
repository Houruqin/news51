// 1 导包
const express = require('express');
const bodyParser =  require('body-parser');

// 2 导入
const c_user = require('./controllers/c_user');
const c_topic =require('./controllers/c_topic');



const router = express.Router();


// 3 监听事件
router
    //渲染登录页请求
    .get('/signin', c_user.showSignin)
    //登录请求
    .post('/signin', c_user.handleSignin)
    //话题渲染页
    .get('/', c_topic.showTopic)
    //渲染发布新话题
    .get('/topic/create', c_topic.createTopic)
    //发布新话题
    .post('/createTopic', c_topic.handleCreateTopic)
    //退出
    .get('/signout', c_user.handleSignout)
    //渲染话题详情
    .get('/topic/:topicID', c_topic.showDetail)
    //渲染编辑话题功能
    .get('/topic/:topicID/edit',c_topic.showEdit)
    //处理编辑话题功能
    .post('/editTopic/:topicID',c_topic.handleEdit)
    //删除
    .get('/topic/:topicID/delete', c_topic.deleteTopic)
    //注册渲染
    .get('/signup',c_user.showSignup)
    //注册处理
    .post('/signup',c_user.handleSignup)



// 4 导出
module.exports = router;