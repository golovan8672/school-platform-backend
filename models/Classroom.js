const {Schema,model} = require('mongoose')

const classForumMessage = new Schema({
    author: {type: String, required: true},
    date: {type: Date, default: Date.now},
    message: {type: String, required: true},
    classroomId: {type: String, required: true}
})

const classroomSchema = new Schema({
    classNumber: {type: String, required: true},
    classForumMessages: [classForumMessage],
    students: [{studentId : {type: String, _id: false}}],
    classTeacherId: {type: String, default: 'none'}
})

module.exports = model('Classroom',classroomSchema)