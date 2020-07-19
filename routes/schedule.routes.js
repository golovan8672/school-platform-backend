const { Router } = require('express')
const router = Router()
const Schedule = require('../models/Schedule')

router.get("/", async (req, res) => {
    const schedule = await Schedule.find().select("-__v");
    res.send(schedule);
});

router.post("/addSchedule", async (req, res) => {

    const classroom = await Classroom.findById(req.params.id);

    classroom.students.push(req.body);
    await classroom.save();

    res.status(200).json({ message: "Расписание добавлено!", resultCode: 0 })

});



module.exports = router