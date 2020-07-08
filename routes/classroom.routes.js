const {Router} = require('express')
const router = Router()
const Classroom= require('../models/Classroom')


router.post("/setClassroom",async(req,res)=>{
    try{
        const classroom = new Classroom(req.body)
        await classroom.save()
        res.status(201).json({message: "Класс создан",resultCode: 0})
    } catch (e){
        res.status(500).json({message : 'Что-то пошло не так, попробуйте снова'})
    }

});

//




module.exports = router