const { Schema, model } = require('mongoose')
const classroomSchema = new Schema({
    classNumber: {type: String, required: true},
    classForumMessages: [classForumMessage],
    students: [{_id: false, studentId: {type: String}}],
    classTeacher: {type: String, default: 'none'},
    students: [{ _id: false, studentId: { type: String }, fio: {type: String} }],
    classTeacher: { 
        teacherId: {type: String, default: ''},
        fio: {type: String, default: ''}
     }

})

module.exports = model('Classroom', classroomSchema)