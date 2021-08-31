const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categories: {
        type: Array,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

const categoryModel = mongoose.model('category', categorySchema)

module.exports = categoryModel