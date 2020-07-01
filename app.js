const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const app = express()

const port = process.env.PORT || 80

app.use('/api/auth', require('./routes/auth.routes'))

app.get('/',(req, res) => {
    res.end ('<h1>SCHOOL PLATFORM API</h1>')
})
app.get('/info',(req,res) => {
    res.end('This api created 02.07.2020')
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