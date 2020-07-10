const { Router } = require('express')
const router = Router()
const Classroom = require('../models/Classroom')

//Получение списка классов и класса 

router.get("/classrooms", async (req, res) => {
    const classrooms = await Classroom.find().select("-__v");
    res.send(classrooms);
});
router.get("/classrooms/:id", async (req, res) => {
    const classroom = await Classroom.findById(req.params.id).select("-__v")
    res.send(classroom);
});

//Удаление ученика из класса
router.delete('/classrooms/:id/deleteStudent', async (req, res) => {
    const classroom = await Classroom.findById({ _id: req.params.id })
    classroom.students.remove(req.body)
    await classroom.save()
    res.status(200).json({ message: "Ученик удален из класса!" })
})

// Добавление учителя и студента

router.post("/classrooms/:id/addStudent", async (req, res) => {
    const classroom = await Classroom.findById(req.params.id);
    const {studentId,fio} = req.body;
    const student = await classroom.students.includes({studentId},0)

    if (student) {
        return res.status(202).json({message: 'Студент уже входит в состав класса',resultCode: 1})
    }

    classroom.students.push(req.body);
    await classroom.save();
    res.status(200).json({ message: "Ученик добавлен!", resultCode: 0 })
});
router.put("/classrooms/:id/addTeacher", async (req, res) => {
    await Classroom.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({message: "Классный руководитель обновлен!"})
});

// Добавление и удаление классов

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