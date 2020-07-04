const {Router} = require('express')
const router = Router()
const Student = require('../models/Student')


router.get('/students',function(req,res){
        try {
            const students = Student.find();
            const {role,email,login,mobileNumber,fio,classroom} = students
            res.status(201).json(role,email,login,mobileNumber,fio,classroom);
        } catch (error) {
            res.status(500).json({message: error})
        }
});


module.exports = router