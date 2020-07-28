const { Schema, model } = require('mongoose')

const scheduleSchema = new Schema({
        classNumber: { type: String, required: true },
        days: {
            Mon: {
                day: {type: String, default: "Понедельник"},
                subjects: {
                    type: Array,
                    default: [null, null, null, null, null, null]
                }
            },
            Tue: {
                day: {type: String, default: "Вторник"},
                subjects: {
                    type: Array,
                    default: [null, null, null, null, null, null]
                }
            },
            Wed: {
                day: {type: String, default: "Среда"},
                subjects: {
                    type: Array,
                    default: [null, null, null, null, null, null]
                }
            },
            Thu: {
                day: {type: String, default: "Четверг"},
                subjects: {
                    type: Array,
                    default: [null, null, null, null, null, null]
                }
            },
            Fri: {
                day: {type: String, default: "Пятница"},
                subjects: {
                    type: Array,
                    default: [null, null, null, null, null, null]
                }
            },
            Sat: {
                day: {type: String, default: "Суббота"},
                subjects: {
                    type: Array,
                    default: [null, null, null, null, null, null]
                }
            },
        }
        
})

module.exports = model('Schedule', scheduleSchema)