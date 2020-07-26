const { Router } = require('express')
const router = Router()
const Schedule = require('../models/Schedule')

router.get("/getSchedules", async (req, res) => {
    const schedule = await Schedule.find().select("-__v");
    res.send(schedule);
});
router.get("/getSchedule/:id", async (req, res) => {
    const schedule = await Schedule.findById({classId: req.params.id}).select("-__v")
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

router.put("/updateSchedule", async (req, res) => {
    const schedule = await Schedule.findById({_id: req.params.id});

    classroom.classForumMessages.map(message => {
        if (message.id === req.params.messageId) {
            message.message = req.body.message;
            message.edited = "1";
        } else if (!req.body.message)  {
            return res.status(401).json({message: "Нельзя передавать пустую строку!", resultCode: 1})
        }
    })
    
    await classroom.save()

    res.status(200).json({message: "Сообщение обновлено!", resultCode: 0})
   
})



module.exports = router