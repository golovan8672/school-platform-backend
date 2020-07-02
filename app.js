const express = require('express')
const mongoose = require('mongoose')
const testData = require('./testData.json')
const bodyParser = require('body-parser')
const config = require('config')
const app = express()

const port = process.env.PORT || 80


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api/auth', require('./routes/auth.routes'))

app.get('/',(req, res) => {
    res.send (
        `<h1>SCHOOL PLATFORM API</h1>
        <h3>test PATH - /users</h3>
        `
        )
})
app.get('/users',(req,res) => {
    res.send(testData)
})

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
    } catch(e){
        console.log('Server Error',e.message)
        process.exit(1)
    }
}

app.listen(port, () => console.log(`Server has been started on port ${port}`))