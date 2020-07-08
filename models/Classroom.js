const {Schema,model} = require('mongoose')

const classroomSchema = new Schema({
    classNumber: {type: String, required: true}
})

module.exports = model('Classroom',classroomSchema)