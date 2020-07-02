const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const User = mongoose.model('User',schema)

module.exports = User;