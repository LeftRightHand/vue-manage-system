
var express = require('express');
var router = express.Router();
var Category = require('../models/Category')

router.get('/list', function (req, res) {
    var page = Number(req.query.page || 1);
    var limit = Number(req.query.pageSize || 10);
    var pages = 0;
    Category.count().then(function (count) {
        pages = Math.ceil(count/limit);
        page = Math.min(page, pages)
        page = Math.max(page, 1)
        var skip = (page -1) * limit
        Category.find().sort({_id: -1}).limit(limit).skip(skip).then(function (doc) {
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
        })
    })
})

router.post('/add', function (req, res) {
    var name = req.body.name || ''
    if (name === '' || name.split(" ").join("").length === 0) {
        res.json({
            status:"401",
            code: 401,
            msg:'内容不能为空'
        });
        return
    }

    Category.findOne({
        name: name
    }, function (err, doc) {
        if(err){
            res.json({
                status:"500",
                code: 500,
                msg:err.message
            });
        } else if (doc) {
            res.json({
                status:"500",
                code: 500,
                msg:'分类已存在'
            });
        } else {
            new Category({
                name: name
            }).save();
            res.json({
                status:"200",
                code: 200,
                msg:'添加成功'
            });
        }
    })
})

router.post('/edit', function (req, res) {
    console.log(req.body)
    var id = req.body.id || '';
    var name = req.body.name || '';
    Category.findOne({
        _id: id
    }, function (err, doc) {
        if (!doc) {
            res.json({
                status:"500",
                code: 500,
                msg:'分类信息不存在'
            });
        } else {
            if (name === doc.name) {
                res.json({
                    status:"200",
                    code: 200,
                    msg:'修改成功'
                });
            } else {
                return Category.findOne({
                    _id: {$ne: id},
                    name: name
                }, function (err, doc) {
                    if (doc) {
                        res.json({
                            status:"500",
                            code: 500,
                            msg:'分类名称已存在'
                        });
                    } else {
                        return Category.update({
                            _id: id
                        }, {
                            name: name
                        }, function () {
                            res.json({
                                status:"200",
                                code: 200,
                                msg:'修改成功'
                            });
                        })
                    }
                })
            }
        }
    })
});

router.post('/delete', function (req, res) {
    var id = req.body.id || '';
    Category.remove({
        _id : id
    }, function (err, doc) {
        if (err) {
            res.json({
                status:"500",
                code: 500,
                msg: err.message
            });
        } else {
            res.json({
                status:"200",
                code: 200,
                msg:'删除成功'
            });
        }
    })
})

module.exports = router;