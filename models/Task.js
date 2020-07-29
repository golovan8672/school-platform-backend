const { Schema, model } = require('mongoose')
const taskSchema = new Schema({
    classNumber: {type: String, required: true},
    publicDate: { type: String, required: true },
    deadlineDate: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: String, required: true },
    taskTitle: { type: String, required: true },
    taskText: { type: String, required: true },
    edited: {type: String, default: "0"},
    editedDate:{type: String, default: ''}
})
module.exports = model('Task', taskSchema)