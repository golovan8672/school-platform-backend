const {Schema,model} = require('mongoose')

const forumSchema = new Schema({
    classroom: {type: String, default: "none"},
    
})

module.exports = model('Moderator',moderatorSchema)