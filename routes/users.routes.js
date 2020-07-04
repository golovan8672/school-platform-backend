const {Router} = require('express')
const router = Router()
const Student = require('../models/Student')


router.get('/students',function(req,res){
	Student.find(function(err,students){
		if(err)
        res.status(200).json(students);
	});
});

module.exports = router