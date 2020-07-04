const {Router} = require('express')
const router = Router()
const Student = require('../models/Student')


router.get('/students',function(req,res){
	Student.find(function(err,students){
		if(err)
			res.send(err);
		
        res.status(200).json([{role: students.role, email: students.email, fio: students.fio, login: students.login, mobileNumber: students.mobileNumber, id: students.id}])
	});
});

module.exports = router