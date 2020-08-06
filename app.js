const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors({credentials: true, origin: true}))

const port = process.env.PORT || 80



app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/classroom', require('./routes/classroom.routes'))
app.use('/api/schedule', require('./routes/schedule.routes'))
app.use('/api/task', require('./routes/task.routes'))
app.use('/api/homework', require('./routes/homework.routes'))


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.listen(port, () => console.log(`Server has been started on port ${port}`))


