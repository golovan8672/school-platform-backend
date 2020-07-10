const { Router } = require('express')
const router = Router()
const Classroom = require('../models/Classroom')


router.get("/classrooms", async (req, res) => {
    const classrooms = await Classroom.find().select("-__v");
    res.send(classrooms);
});
router.get("/classrooms/:id", async (req, res) => {
    const classroom = await Classroom.findById(req.params.id).select("-__v")
    res.send(classroom);
});
router.post("/classrooms/:id/addStudents", async (req, res) => {
    const classroom = await Classroom.findById(req.params.id);
    classroom.students.push(req.body);
    await classroom.save();
});
router.post("/addClassroom", async (req, res) => {
    try {
        const newClassroom = new Classroom(req.body)
        await newClassroom.save()
        res.status(201).json({ message: "Класс создан", resultCode: 0 })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

router.delete('/deleteClassroom/:id', async (req, res) => {
    await Classroom.findByIdAndRemove({ _id: req.params.id })
    res.status(200).json({ message: "Класс удален!" })
})

module.exports = router