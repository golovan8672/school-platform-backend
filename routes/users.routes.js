const {Router} = require('express')
const router = Router()
const Student = require('../models/Student')


router.get('/students',function(req,res){
	Student.find(function(err,students){
		if(err)
			res.send(err);
        const {role,email,login,mobileNumber,fio,classroom} = students
        res.status(200).json(role,email,login,mobileNumber,fio,classroom);
	});
});

module.exports = router