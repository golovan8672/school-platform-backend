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

router.delete('/deleteUser/:id', async (req, res) => {
    await Student.findByIdAndRemove({ _id: req.params.id }) || await Moderator.findByIdAndRemove({ _id: req.params.id }) || await Teacher.findByIdAndRemove({ _id: req.params.id })
    res.send("Пользователь удален!")
})

// router.put('/updateUser/:id', async (req, res) => {
//     await Moderator.updateOne({ _id: req.params.id }, { $set: req.body }) || await Teacher.updateOne({ _id: req.params.id }, { $set: req.body })
//     
// })

router.put('/updateUser/:id',  async (req, res) => {
    Student.findByIdAndUpdate(req.params.id, req.body)
    res.send("Пользователь обновлен!")
  });



module.exports = router

