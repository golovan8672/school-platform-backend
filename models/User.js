const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    fio: {type: String, required: true},
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    mobileNumber: {type: String, required: true, unique: true},
    role: {type: String, enum: ['student', 'teacher', 'moderator'], default: 'student'},
    password: {type: String, required: true}
})

module.exports = model('User',userSchema)