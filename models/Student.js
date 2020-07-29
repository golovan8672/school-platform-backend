const {Schema,model} = require('mongoose')

const studentSchema = new Schema({
    fio: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mobileNumber: {type: String, required: true, unique: true},
    login: {type: String, required: true, unique: true},
    classId: {type: String, default: ''},
    classNumber: {type: String, default: ''},
    role: {type: String, default: 'student'},
    password: {type: String, required: true}
})

module.exports = model('Student',studentSchema)