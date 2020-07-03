const {Schema,model} = require('mongoose')

const teacherSchema = new Schema({
    fio: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mobileNumber: {type: String, required: true, unique: true},
    login: {type: String, required: true, unique: true},
    classroom: {type: String},
    subject:{type: String, required: true},
    role: {type: String, default: 'student'},
    password: {type: String, required: true}
})

module.exports = model('Teacher',teacherSchema)