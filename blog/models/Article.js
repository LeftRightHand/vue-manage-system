
var mongoose = require('mongoose');
var articleSchema = require('../schema/article');

module.exports = mongoose.model('Article', articleSchema);