const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 80

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
const mongoURI = "mongodb+srv://golovan8672:xum01KnhZhrjQx7U@cluster0.iybeo.azure.mongodb.net/app?retryWrites=true&w=majority"

app.listen(port, () => console.log(`Server has been started on port ${port}`))

mongoose.connect(process.env.MONGODB_URI || mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})




