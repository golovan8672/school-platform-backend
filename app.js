const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()


const port = process.env.PORT || 80

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))




async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
    app.listen(port, () => console.log(`Server has been started on port ${port}`))

    } catch(e){
        console.log('Server Error',e.message)
        process.exit(1)
    }
}
start()
