
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    title: String,
    createAt: {
        type: Date,
        default: Date.now
    },

    updateAt: {
        type: Date,
        default: Date.now
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