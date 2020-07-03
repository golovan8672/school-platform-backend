const {Router} = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const {check, validationResult} = require('express-validator')
const Moderator = require('../models/Moderator')
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')

const Users = [Student,Moderator,Teacher]

router.post('/moderatorReg', async (req,res) => {
    try{
        console.log("Body:", req.body)

        const {fio,login,role,password} = req.body

        const moderatorLogin  = await Moderator.findOne({login})

        if (moderatorLogin) {
            return res.status(202).json({message: 'Модератор с таким логином уже существует',resultCode: 1})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const moderator = new Moderator({fio,login,role,password: hashedPassword})

        await moderator.save()

        res.status(201).json({message: "Пользователь создан",resultCode: 0})
    } catch (e){
        res.status(500).json({message : 'Что-то пошло не так, попробуйте снова'})
    }
})

router.post('/teacherReg', async (req,res) => {
    try{
        console.log("Body:", req.body)

        const {fio,login,email,mobileNumber,role,classroom,subject,password} = req.body

        const teacherLogin  = await Teacher.findOne({login}) && Student.findOne({login})
        const teacherEmail  = await Teacher.findOne({email}) && Student.findOne({email})
        const teacherPhone  = await Teacher.findOne({mobileNumber}) && Student.findOne({mobileNumber})
        
        if (teacherPhone) {
            return res.status(202).json({message: 'Пользователь с таким номером уже существует',resultCode: 1})
        }

        if (teacherEmail) {
            return res.status(202).json({message: 'Пользователь с такой почтой уже существует',resultCode: 1})
        }

        if (teacherLogin ) {
            return res.status(202).json({message: 'Пользователь с таким логином уже существует',resultCode: 1})
        }


        const hashedPassword = await bcrypt.hash(password, 12)
        const teacher = new Teacher({fio,login,email,mobileNumber,role,classroom,subject,password: hashedPassword})

        await teacher.save()

        res.status(201).json({message: "Пользователь создан",resultCode: 0})
    } catch (e){
        res.status(500).json({message : 'Что-то пошло не так, попробуйте снова'})
    }
})

router.post('/studentReg', async (req,res) => {
    try{
        console.log("Body:", req.body)

        const {fio,login,email,mobileNumber,classroom,role,password} = req.body

        

        const studentLogin  = await (Student.findOne({login}) && Teacher.findOne({login})) 
        const studentEmail  = await (Student.findOne({email}) && Teacher.findOne({email})) 
        const studentPhone  = await (Student.findOne({mobileNumber}) && Teacher.findOne({mobileNumber})) 

        if (studentPhone) {
            return res.status(202).json({message: 'Пользователь с таким номером уже существует',resultCode: 1})
        }

        if (studentEmail) {
            return res.status(202).json({message: 'Пользователь с такой почтой уже существует',resultCode: 1})
        }

        if (studentLogin ) {
            return res.status(202).json({message: 'Пользователь с таким логином уже существует',resultCode: 1})
        }


        const hashedPassword = await bcrypt.hash(password, 12)
        const student = new Student({fio,login,email,mobileNumber,role,classroom,password: hashedPassword})

        await student.save()

        res.status(201).json({message: "Пользователь создан",resultCode: 0})
    } catch (e){
        res.status(500).json({message : 'Что-то пошло не так, попробуйте снова'})
    }
})

router.post('/login',
[
    check('login','Введите логин').exists(),
    check('password','Введите пароль').exists(),
],
 async (req,res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при входе в систему"

            })
        }
        const {login,password} = req.body


        let user = await Users.findOne({login})

        if (!user) {
            return res.status(202).json({message: 'Неверный логин или пароль',resultCode: 1})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        
        if (!isMatch) {
            return res.status(202).json({message: 'Неверный логин или пароль',resultCode: 1})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id, role: user.role, login: user.login})

    } catch (e){
        res.status(500).json({message : 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router