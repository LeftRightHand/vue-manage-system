var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: '登录' });
})

router.get('/register', function(req, res, next) {
    res.render('register', { title: '注册' });
})

router.get('/home', function(req, res, next) {
    res.render('home', { title: '后台管理系统'});
});

module.exports = router;
