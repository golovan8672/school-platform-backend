require('dotenv/config')
const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors({credentials: true, origin: true}))

const port = process.env.PORT || 80

const storage = multer = multer.memoryStorage({
    destination: function(req,file,callback){
        callback(null,'')
    }
})

export const upload = multer({storage}).single('image')


app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/classroom', require('./routes/classroom.routes'))
app.use('/api/schedule', require('./routes/schedule.routes'))
app.use('/api/task', require('./routes/task.routes'))
app.use('/api/homework', require('./routes/homework.routes'))
app.use('/api/file', require('./routes/file.routes'))

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.listen(port, () => console.log(`Server has been started on port ${port}`))


