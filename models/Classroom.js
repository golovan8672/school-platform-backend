const { Schema, model } = require('mongoose')
const classroomSchema = new Schema({
    classNumber: {type: String, required: true},
    classForumMessages: [{
        authorId: {type: String, required: true},
        date: {type: Date, default: Date.now},
        message: {type: String, required: true}
    }],
    students: [{_id: false, studentId: {type: String}}],
    classTeacher: {type: String, default: 'none'},
    students: [{ _id: false, studentId: { type: String }, fio: {type: String} , login: {type: String}, email: {type: String}, mobileNumber: {type: String}}],
    classTeacher: { 
        teacherId: {type: String},
        fio: {type: String},
        login: {type: String},
        email: {type: String},
        mobileNumber: {type: String},
        subject: {type: String}
     }

})

module.exports = model('Classroom', classroomSchema)