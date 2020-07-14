const { Schema, model } = require('mongoose')

const classroomSchema = new Schema({
    classNumber: { type: String, required: true },
    classForumMessages: [{
        author: { type: String, required: true },
        date: { type: Date, default: Date.now },
        message: { type: String, required: true }
    }],
    students: [{ _id: false, studentId: { type: String }, fio: {type: String} }],
    classTeacher: { type: String, default: 'none' }
})

module.exports = model('Classroom', classroomSchema)