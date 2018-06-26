
var  mongoose = require('mongoose');

module.exports = new mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId
    },

    title: String,
    createAt: {
        type: Date,
        default: new Date()
    },

    updateAt: {
        type: Date,
        default: new Date()
    },

    content: {
        type: String,
        default: ''
    },

    editType: {
        type: Number,
        default: 0
    }
})