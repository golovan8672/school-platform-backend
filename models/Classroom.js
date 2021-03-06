const { Schema, model } = require('mongoose')
const classroomSchema = new Schema({
    classNumber: {type: String, required: true, unique: true,},
    classForumMessages: [{
        authorFio: {type: String, required: true},
        authorId: {type: String, required: true},
        date: {type: Date, default: Date.now},
        message: {type: String, required: true},
        edited: {type: String, default: "0"}
    }],
    students: [{_id: false, studentId: {type: String}}],
    classTeacher: {type: String, default: 'none'},
    students: [{ _id: false, studentId: { type: String }, fio: {type: String} , login: {type: String}, email: {type: String}, mobileNumber: {type: String}}],
    classTeacher: { 
        teacherId: {type: String, default: ''},
        fio: {type: String, default: ''},
        login: {type: String, default: ''},
        email: {type: String, default: ''},
        mobileNumber: {type: String, default: ''},
        subject: {type: String, default: ''}
     },
})

module.exports = model('Classroom', classroomSchema)