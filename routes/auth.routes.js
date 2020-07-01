const {Router} = require('express')
const Student = require('../models/Student')
const router = Router()

router.post('/register', async (req,res) => {
    try{

        const {email,password} = req.body

        const candidate = await Student.findOne({login})

        if (candidate) {
            return res.status(400).json({message: 'Такой ученик уже существует'})
        }

    } catch (e){
        res.status(500).json({message : 'Что-то пошло не так, попробуйте снова'})
    }
})
router.post('/login', async (req,res) => {
    
})

module.exports = router