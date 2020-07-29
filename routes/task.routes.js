const { Router } = require('express')
const router = Router()
const Task = require('../models/Task')


router.get("/getTasks", async (req, res) => {
    try {
        const tasks = await Task.find().select("-__v");
        res.send(tasks);
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});
router.get("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).select("-__v")
        res.send(task);
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});



//Добавление и удаление заданий
router.post("/addTask", async (req, res) => {
    try {
        const newTask = new Task(req.body)
        await newTask.save()
        res.status(201).json({ message: "Задание опубликовано!", resultCode: 0 })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});
router.delete("/classrooms/:id/deleteTask/:taskId", async (req, res) => {
    try {
        await Task.findByIdAndRemove({ _id: req.params.id })
        res.status(200).json({ message: "Задание удалено!" })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

});







module.exports = router