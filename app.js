//入口页


// 1 导包
const express = require('express');
const bodyParser = require('body-parser');
// 2、导入
const router = require('./router');
const session = require('express-session');

const MySQLStore =require('express-mysql-session')(session);

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'news51'
};
const sessionStore = new MySQLStore(options);

const app = express();
// 3、配置包
app.engine('html', require('express-art-template') );
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));


//使用 app.locals
app.use((req, res,next) => {
    app.locals.sessionUser = req.session.user;
    next();
})

//将views中为文件以列表形式展示在网页上
// app.use('/views',serveIndex('./views'));

// 4、处理静态资源
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));

//中间件的使用;统一处理错误
app.use((err,req, res, next)=> {
    res.send({
        code:500,
        message:err.message
    })
});



 // 5、监听
app.use(router);


//同意配置404页面，页面位置在挂载路由后
app.use((req, res,next) => {
    res.render('404.html');
    next();
})


// 6、绑定端口
app.listen(23456, () => {
    console.log('run it')
})