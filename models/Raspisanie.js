const { Schema, model } = require('mongoose')

const raspisanieSchema = new Schema({
    Mon: [{
        classId: {String}, 
        classNumber: {String},
    }],
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
    Sun,
})

module.exports = model('Raspisanie', raspisanieSchema)