var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username === '') {
        res.json({
            status:"401",
            code: 401,
            msg:'用户名不能为空'
        });
        return
    }

    if (password === '') {
        res.json({
            status:"402",
            code: 402,
            msg:'密码不能为空'
        });
        return
    }

    User.findOne({username: username},function(err,doc){
        if (err) {
            res.json({
                status:"500",
                code: 500,
                msg:err.message
            });
        } else if (!doc) {
            res.json({
                status:'404',
                code: 404,
                msg:'用户名不存在！',
            });
        } else {
            if (password !== doc.password) {
                res.json({
                    status:'404',
                    code: 404,
                    msg:'密码错误',
                });
            } else {
                req.cookies.user = doc;
                res.json({
                    status:'200',
                    code: 200,
                    msg:'登录成功',
                });
            }
        }
    });
});

router.post('/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    if (username === '') {
        res.json({
            status:"401",
            code: 401,
            msg:'用户名不能为空'
        });
        return
    }

    if (password === '') {
        res.json({
            status:"402",
            code: 402,
            msg:'密码不能为空'
        });
        return
    }

    if (password !== repassword) {
        res.json({
            status:"403",
            code: 403,
            msg:'两次输入的密码不一致'
        });
        return
    }

    User.findOne({username: username},function(err,doc){   // 同理 /login 路径的处理方式
        if(err){
            res.json({
                status:"500",
                code: 500,
                msg:err.message
            });
        } else if(doc){
            res.json({
                status:'500',
                code: 500,
                msg:'用户名已存在！',
            });
            console.log(doc)
        } else {
            res.json({
                status:'200',
                code: 200,
                msg:'注册成功',
            });
            var user = new User({
                username: username,
                password: password
            });
            user.save();
        }
    });
});

module.exports = router;
