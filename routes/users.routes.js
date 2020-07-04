const {Router} = require('express')
const router = Router()
const Student = require('../models/Student')


router.get("/students", async (req, res) => {
    const students = await Student.find().select("-password");
    res.send(students);
  });

module.exports = router