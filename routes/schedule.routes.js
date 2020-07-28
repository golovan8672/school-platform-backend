const { Router } = require('express')
const router = Router()
const Schedule = require('../models/Schedule')

router.get("/getSchedules", async (req, res) => {
    const schedule = await Schedule.find().select("-__v");
    res.send(schedule);
});
router.get("/getSchedule/:classId", async (req, res) => {
    const schedule = await Schedule.find({ classId: req.params.classId }).select("-__v")
    res.send(schedule);
});
router.delete("/deleteSchedule/:classId", async (req, res) => {
    await Schedule.remove({ classId: req.params.classId })
    res.status(200).json({ message: "Расписание удалено!", resultCode: 0 })
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


router.put("/updateSchedule/:id", async (req, res) => {
    const schedule = await Schedule.findById({ _id: req.params.id });
    switch (req.body.day) {
        case 'Понедельник':
            schedule.days.Mon.subjects.splice(0,6)
            req.body.subjects.map(item => schedule.days.Mon.subjects.push(item) )
            break;
        case 'Вторник':
            schedule.days.Tue.subjects.splice(0,6)
            req.body.subjects.map(item => schedule.days.Tue.subjects.push(item) )
            break;
        case 'Среда':
            schedule.days.Wed.subjects.splice(0,6)
            req.body.subjects.map(item => schedule.days.Wed.subjects.push(item) )
            break;
        case 'Четверг':
            schedule.days.Thu.subjects.splice(0,6)
            req.body.subjects.map(item => schedule.days.Thu.subjects.push(item) )
            break;
        case 'Пятница':
            schedule.days.Fri.subjects.splice(0,6)
            req.body.subjects.map(item => schedule.days.Fri.subjects.push(item) )
            break;
        case 'Суббота':
            schedule.days.Sat.subjects.splice(0,6)
            req.body.subjects.map(item => schedule.days.Sat.subjects.push(item) )
            break;
        default:
            res.status(404).json({ message: "День недели не найден!", resultCode: 1 });
    }
    res.status(200).json({ message: "Расписание обновлено!", resultCode: 0 });
    await schedule.save()
})

module.exports = router