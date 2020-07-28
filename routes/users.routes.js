const { Router } = require('express')
const router = Router()
const Student = require('../models/Student')
const Moderator = require('../models/Moderator')
const Teacher = require('../models/Teacher')


router.get("/students", async (req, res) => {
    try {
        const students = await Student.find().select("-password").select("-__v");
        res.send(students);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

router.get("/moderators", async (req, res) => {
    try {
        const moderators = await Moderator.find().select("-password").select("-__v");
        res.send(moderators);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

router.get("/teachers", async (req, res) => {
    try {
        const teachers = await Teacher.find().select("-password").select("-__v");
        res.send(teachers);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});
router.get("/teachersSubjects", async (req, res) => {
    try {
        const teachers = await Teacher.find().select("-password -email -mobileNumber -login -classroom -role -__v -_id")
        res.send(teachers);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});


router.delete('/deleteUser/:id', async (req, res) => {
    try {
        await Student.findByIdAndRemove({ _id: req.params.id }) || await Moderator.findByIdAndRemove({ _id: req.params.id }) || await Teacher.findByIdAndRemove({ _id: req.params.id })
        res.status(200).json({ message: "Пользователь удален" })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


router.put('/updateModerator/:id', async (req, res) => {
    try {
        await Moderator.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ message: "Модератор обновлен!" })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

router.put('/updateStudent/:id', async (req, res) => {
    try {
        await Student.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ message: "Ученик обновлен!" })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

router.put('/updateTeacher/:id', async (req, res) => {
    try {
        await Teacher.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ message: "Учитель обновлен!" })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});



module.exports = router

