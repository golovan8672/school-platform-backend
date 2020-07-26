const { Schema, model } = require('mongoose')

const scheduleSchema = new Schema({
    classShedule: {
        classNumber: { type: String, required: true },
        Mon: {
            day: "Понедельник",
            subjects: {
                type: Array,
                default: [null, null, null, null, null, null]
            }
        },
        Tue: {
            day: "Вторник",
            subjects: {
                type: Array,
                default: [null, null, null, null, null, null]
            }
        },
        Wed: {
            day: "Среда",
            subjects: {
                type: Array,
                default: [null, null, null, null, null, null]
            }
        },
        Thu: {
            day: "Четверг",
            subjects: {
                type: Array,
                default: [null, null, null, null, null, null]
            }
        },
        Fri: {
            day: "Пятница",
            subjects: {
                type: Array,
                default: [null, null, null, null, null, null]
            }
        },
        Sat: {
            day: "Суббота",
            subjects: {
                type: Array,
                default: [null, null, null, null, null, null]
            }
        },
        Sun: {
            day: "Воскресенье",
            subjects: {
                type: Array,
                default: [null, null, null, null, null, null]
            }
        },
    }

})

module.exports = model('Schedule', scheduleSchema)