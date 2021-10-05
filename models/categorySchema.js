const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const categorySchema = new mongoose.Schema({
    categories: {
        type: Array,
        required: true
    },
    user: {type: Schema.Types.String, ref: 'user'}
})

const categoryModel = mongoose.model('category', categorySchema)

module.exports = categoryModel