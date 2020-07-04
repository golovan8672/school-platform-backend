const {Router} = require('express')
const router = Router()
const Student = require('../models/Student')


router.get("/students", async (req, res) => {
    const students = await Student.find().select("-password","-__v");
    res.send(students);
  });

module.exports = router