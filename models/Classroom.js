<<<<<<< HEAD
const { Schema, model } = require('mongoose')

const classroomSchema = new Schema({
    classNumber: { type: String, required: true },
    classForumMessages: [{
        author: { type: String, required: true },
        date: { type: Date, default: Date.now },
        message: { type: String, required: true }
    }],
    students: [{
        _id: false,
        studentId: { type: String, required: true },
        fio: {type: String, required: true}
    }],
    classTeacher: { type: String, default: 'none' }
=======
const {Schema, model} = require('mongoose')

const classForumMessage = new Schema({
    author: {type: String, required: true},
    date: {type: Date, default: Date.now},
    message: {type: String, required: true},
    classroomId: {type: String, required: true}
})

const classroomSchema = new Schema({
    classNumber: {type: String, required: true},
    classForumMessages: [classForumMessage],
    students: [{_id: false, studentId: {type: String}}],
    classTeacher: {type: String, default: 'none'}
>>>>>>> a899c3fa40307020bc1d1ffe09e93a035a84a9a3
})

module.exports = model('Classroom', classroomSchema)