const {Schema,model} = require('mongoose')

const studentSchema = new Schema({
    fio: {type: String, required: true},
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, default: 'student'},
    class: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = model('User',studentSchema)