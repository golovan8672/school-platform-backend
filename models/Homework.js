const { Schema, model } = require('mongoose')
const homeworkSchema = new Schema({
    classNumber: {type: String, required: true},
    taskId: {type: String, required: true},
    student: {type: String, required: true},
    publicDate: { type: String, required: true },
    publicTaskDate: {type: String, required: true},
    subject: { type: String, required: true },
    teacher: { type: String, required: true },
    taskTitle: {type: String, required: true},
    answerToTask: { type: String, required: true },
    answerFileName: {type: String},
    deadlineDate: {type: String, required: true},
    mark: {type: String, enum: ["","2","3","4","5"], default: ""},
    teacherDesc: {type: String, default: ''},
    status: {type: String, enub: ["Не проверено", "Проверено"], default: "Не проверено"}
})
module.exports = model('Homework', homeworkSchema)