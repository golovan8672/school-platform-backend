const { Schema, model } = require('mongoose')

const classroomSchema = new Schema({
    classNumber: { type: String, required: true },
    classForumMessages: [{
        authorId: { type: String, required: true },
        date: { type: Date, default: Date.now },
        message: { type: String, required: true }
    }],
    students: [{ _id: false, studentId: { type: String }, fio: {type: String} }],
    classTeacher: { 
        teacherId: {type: String, default: ''},
        fio: {type: String, default: ''}
     }
})

module.exports = model('Classroom', classroomSchema)