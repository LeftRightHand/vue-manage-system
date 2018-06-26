
var express = require('express');
var router = express.Router();
var Article = require('../models/Article')

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
        categoryId: id,
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