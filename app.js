const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 80

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.listen(port, () => console.log(`Server has been started on port ${port}`))


