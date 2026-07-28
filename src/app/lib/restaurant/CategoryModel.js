import mongoose from "mongoose";

const CategoryModel = mongoose.Schema({
    categoryname: String,
    categorydate: {
        type: Date,
        default: Date.now
    },
    resto_id: mongoose.Schema.Types.ObjectId
})

export const CategorySchema = mongoose.models.categorys || mongoose.model('categorys', CategoryModel)
