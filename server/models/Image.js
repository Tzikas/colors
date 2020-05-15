const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    colors: [String]
})

const Image = mongoose.model('Image' , imageSchema)

module.exports = Image