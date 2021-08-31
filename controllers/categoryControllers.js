const categoryModel = require("../models/categorySchema");

const response = (res, code, payload) => {
    return res.status(code).json(payload)
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({user: req.user.username})
        console.log(categories)
        return response(res, 200, categories)
    } catch (e) {
        return response(res, 400, {message: "failed to get categories"})
    }
}

const addCategory = async (req, res) => {
    try{
        const {user} = req.body
        const categoryByUsername = await categoryModel.findOne({user})
        const newCategory = !categoryByUsername ? await categoryModel.create({categories: [req.body.category], user}) :
            await categoryModel.findOneAndUpdate({user},
                { "$addToSet": { "categories": req.body.category } },
                { "new": true}
            )
        return response(res, 200, newCategory)
    }catch(e){
        return response(res, 400, {message: "No Category passed to be added"})
    }
}

module.exports = {getAllCategories, addCategory}