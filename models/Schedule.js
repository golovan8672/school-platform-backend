const { Schema, model } = require('mongoose')

const scheduleSchema = new Schema({
    classShedule: {
        classNumber: {type: String, required: true},
        Mon: {
            subjects: [{
                subject: {type: String},
                teacherFio: {type: String}
                
            }]
        },
        Tue: {
            subjects: [{
                subject: {type: String},
                teacherFio: {type: String}
            }]
        },
        Wed: {
            subjects: [{
                subject: {type: String},
                teacherFio: {type: String}
            }]
        },
        Thu: {
            subjects: [{
                subject: {type: String},
                teacherFio: {type: String}
            }]
        },
        Fri: {
            subjects: [{
                subject: {type: String},
                teacherFio: {type: String}
            }]
        },
        Sat: {
            subjects: [{
                subject: {type: String},
                teacherFio: {type: String}
            }]
        },
       Sun: {
            subjects: [{
                subject: {type: String},
                teacherFio: {type: String}
            }]
        },
    }
   
})

module.exports = model('Schedule', scheduleSchema)