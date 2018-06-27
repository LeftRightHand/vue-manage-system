
var express = require('express');
var router = express.Router();
var Article = require('../models/Article')
var dateFormat = require('dateformat');

router.post('/list', function (req, res) {
    var page = Number(req.body.page || 1);
    var limit = Number(req.body.pageSize || 10);
    var pages = 0;
    Article.count().then(function (count) {
        pages = Math.ceil(count/limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page -1) * limit;
        Article.find().sort({_id: -1}).limit(limit).skip(skip).populate(['category']).exec(function (err, doc) {
            if (err) {
                res.json({
                    status:"500",
                    code: 500,
                    msg:err.message,
                })
            } else {
                res.json({
                    status:"200",
                    code: 200,
                    msg:'',
                    result: {
                        list: doc,
                        count: count,
                        pages: pages,
                        pageSize: limit,
                        page: page
                    }
                });
            }
        })
    })
})

router.post('/delete', function (req, res) {
    var id = req.body.id || '';
    Article.remove({
        _id : id
    }, function (err, doc) {
        if (err) {
            res.json({
                status:"500",
                code: 500,
                msg:err.message,
            })
        } else {
            res.json({
                status:"200",
                code: 200,
                msg:'删除成功',
            })
        }
    })
})

router.post('/publish', function (req, res) {
    var id = req.body.id || '';
    var title = req.body.title || '';
    var content = req.body.content || '';
    var type = req.body.editType || 0;
    if (title === '' || title.split(" ").join("").length === 0) {
        res.json({
            status:"401",
            code: 401,
            msg:'标题不能为空'
        });
        return
    }
    if (id === '' || id.split(" ").join("").length === 0) {
        res.json({
            status:"401",
            code: 401,
            msg:'分类不能为空'
        });
        return
    }
    if (content === '' || content.split(" ").join("").length === 0) {
        res.json({
            status:"401",
            code: 401,
            msg:'内容不能为空'
        });
        return
    }

    new Article({
        category: id,
        title: title,
        editType: type,
        content: content
    }).save(function (err) {
        if (err) {
            res.json({
                status:"500",
                code: 500,
                msg:err.message
            });
        } else  {
            res.json({
                status:"200",
                code: 200,
                msg:""
            });
        }
    })
})

module.exports = router;