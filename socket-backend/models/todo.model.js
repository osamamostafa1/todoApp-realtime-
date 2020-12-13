const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    description: {
        type: String
    }
})

module.exports = mongoose.model('Todo', todoSchema)