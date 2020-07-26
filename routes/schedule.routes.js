const { Router } = require('express')
const router = Router()
const Schedule = require('../models/Schedule')

router.get("/", async (req, res) => {
    const schedule = await Schedule.find().select("-__v");
    res.send(schedule);
});

router.post("/addSchedule", async (req, res) => {
    try {
        const newSchedule = new Schedule(req.body)
        await newSchedule.save()
        res.status(201).json({ message: "Расписание создано", resultCode: 0 })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});




module.exports = router