const { Router } = require('express')
const router = Router()
const Classroom = require('../models/Classroom')

// Получение списка классов и класса 

router.get("/classrooms", async (req, res) => {
    const classrooms = await Classroom.find().select("-__v");
    res.send(classrooms);
});
router.get("/classrooms/:id", async (req, res) => {
    const classroom = await Classroom.findById(req.params.id).select("-__v")
    res.send(classroom);
});

// Добавление и удаление учителя и студента

router.delete("/classrooms/:id/deleteStudent/:studentId", async (req, res) => {
    const studentId = req.params.studentId
    const classroom = await Classroom.findById({_id: req.params.id});
    classroom.students.remove({studentId: studentId});
    await classroom.save(); 
    res.status(200).json({ message: "Ученик удален из класса!", resultCode: 0 })
});
router.post("/classrooms/:id/addStudent", async (req, res) => {
    console.log("Body:", req.body)
    const classroom = await Classroom.findOne(req.params.id);

    classroom.students.push(req.body);
    await classroom.save();

    res.status(200).json({ message: "Ученик добавлен!", resultCode: 0 })

});
router.put("/classrooms/:id/addTeacher", async (req, res) => {

    let classTeacher = {
        classTeacher: {
            teacherId: req.body.teacherId,
            fio: req.body.fio,
            login: req.body.login,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            subject: req.body.subject
        }
    }
    
    await Classroom.findByIdAndUpdate(req.params.id, classTeacher)
    res.status(200).json({message: "Классный руководитель добавлен!", resultCode: 0})

});

//Добавление и удаление сообщения
router.post("/classrooms/:id/addMessage", async (req, res) => {
    const classroom = await Classroom.findById(req.params.id);

    console.log(req.body)

    classroom.classForumMessages.push(req.body);
    await classroom.save();

    res.status(200).json({ message: "Сообщение добавлено!", resultCode: 0 })
});

router.delete("/classrooms/:id/deleteMessage/:messageId", async (req, res) => {
    const classroom = await Classroom.findById({_id: req.params.id});
    classroom.classForumMessages.remove({_id: req.params.messageId});
    await classroom.save(); 
    res.status(200).json({ message: "Сообщение удалено!", resultCode: 0 })
});
router.put("/classrooms/:id/updateMessage/:messageId", async (req, res) => {
    const classroom = await Classroom.findById({_id: req.params.id});

    classroom.classForumMessages.map(message => {
        if (message.id === req.params.messageId) {
            message.message = req.body.message;
            message.edited = "1";

            await classroom.save()

            res.status(200).json({message: "Сообщение обновлено!", resultCode: 0})

        } else if (!req.body.message || req.body.message) {
            res.status(401).json({message: "Нельзя передавать пустую строку!", resultCode: 1})
        } else res.status(404).json({message: "Такого сообщения не существует!!", resultCode: 1})
    })
    

   
})



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