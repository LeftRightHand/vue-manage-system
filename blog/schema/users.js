var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    username : {type:String, required: true},
    password  : {type:String, required: true},
    createAt : { type:Date, default:Date.now },
});