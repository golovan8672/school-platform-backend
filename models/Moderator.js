const {Schema,model} = require('mongoose')

const moderatorSchema = new Schema({
    fio: {type: String, required: true},
    login: {type: String, required: true, unique: true},
    role: {type: String, default: 'moderator'},
    password: {type: String, required: true}
})

module.exports = model('Moderator',moderatorSchema)