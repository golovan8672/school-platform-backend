const { Router } = require('express')
const router = Router()
const Student = require('../models/Student')
const Moderator = require('../models/Moderator')
const Teacher = require('../models/Teacher')


router.get("/students", async (req, res) => {
    const students = await Student.find().select("-password").select("-__v");
    res.send(students);
});
router.get("/moderators", async (req, res) => {
    const moderators = await Moderator.find().select("-password").select("-__v");
    res.send(moderators);
});
router.get("/teachers", async (req, res) => {
    const teachers = await Teacher.find().select("-password").select("-__v");
    res.send(teachers);
});

module.exports = router