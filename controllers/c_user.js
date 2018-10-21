//登录页




// 1 导包
// 2 导入(数据库中的数据)
const m_user = require('../models/m_user')

// 3 处理函数

//渲染页面
const showSignin = (req, res) => {
    res.render('signin.html')
}

//登录请求
const handleSignin = (req, res) => {
    //获取表单数据
    const body = req.body;

    //使用回调函数，此为函数调用，并传入实参
    m_user.checkEmail(body.email,(err,data)=> {
        if(err) {
            return next(err)
        }
        if(!data[0]){
            return res.send({
                code:1,
                message:'邮箱不正确'
            })
        }
        if(body.password != data[0].password){
            return res.send({
                code:2,
                message:'密码错误'
            })
        }

        //在写话题列表页的时候
        //需要用户信息data[0]，并保存，使用session
        //body-parser -》 req.body
        //express-session -> req.session

        req.session.user = data[0];
        // console.log(data[0])
        res.send({
            code:200,
            message:'可以跳转了'
        })
    })

}

//处理用户退出请求
exports.handleSignout =(req, res) => {
    //清除session中的用户信息
    delete req.session.user;
    res.redirect('/signin');
}

//渲染注册页面
exports.showSignup =(req,res) => {
    res.render('signup.html');
}

//处理注册页面
exports.handleSignup = (req, res) => {
    const body = req.body;
    //验证邮箱
    m_user.checkEmail(body.email, (err, data) => {
        if(err) {
            return next(err)
        }
        if(data[0]) {
            return res.send({
                code:1,
                message:'邮箱已存在'
            })
        }

        //如果邮箱不存在，验证昵称  body.nickname
        m_user.checkNickname(body.nickname, (err, data) => {
            if(err) {
                return next(err)
            }
            if(data[0]) {
                return res.send({
                    code:2,
                    message:'密码已存在'
                })
            }

            //添加数据
            m_user.addUser(body, (err, data) => {
                if(err) {
                    return next(err)
                }
                res.send({
                    code:200,
                    message:'注册成功'
                })
            })

        })

    })
}


// 4 导出
exports.showSignin = showSignin;
exports.handleSignin = handleSignin;