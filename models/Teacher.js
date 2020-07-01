const {Schema,model} = require('mongoose')

const teacherSchema = new Schema({
    fio: {type: String, required: true},
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, default: 'teacher'},
    teacherClass: {type: String},
    subject: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = model('Teacher',teacherSchema)