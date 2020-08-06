require('dotenv/config')

const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors({credentials: true, origin: true}))

const port = process.env.PORT || 80

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const upload = multer({storage}).single('image')

app.post('/api/upload',upload,(req, res) => {

    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })
})


const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})


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


