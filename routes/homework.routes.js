const { Router } = require('express')
const router = Router()
const Homework = require('../models/Homework')


router.get("/getHomeworks", async (req, res) => {
    try {
        const homeworks = await Homework.find().select("-__v");
        res.send(homeworks);
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});
router.get("/:id", async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id).select("-__v")
        res.send(homework);
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

router.put("/setMark/:id", async (req, res) => {
    try {

        const homework = await Homework.findById({ _id: req.params.id });

        homework.mark = req.body.mark,
        homework.teacherDesc = req.body.teacherDesc,
        homework.status = "Проверено"

        await homework.save()

        res.status(200).json({ message: "Оценка выставлена!", resultCode: 0 })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})


//Добавление и удаление заданий
router.post("/addHomework", async (req, res) => {
    try {
        const newHomework = new Homework(req.body)
        await newHomework.save()
        res.status(201).json({ message: "Ответ отправлен!", resultCode: 0 })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

module.exports = router