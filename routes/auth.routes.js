const {Router} = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')


router.post('/registration', async (req,res) => {
    try{
        console.log("Body:", req.body)

        const {fio,login,email,mobileNumber,role,password} = req.body

        const userLogin  = await User.findOne({login})
        const userEmail  = await User.findOne({email})
        const userPhone  = await User.findOne({mobileNumber})
        
        if (userPhone) {
            return res.status(202).json({message: 'Пользователь с таким номером уже существует',resultCode: 1})
        }

        if (userEmail) {
            return res.status(202).json({message: 'Пользователь с такой почтой уже существует',resultCode: 1})
        }

        if (userLogin ) {
            return res.status(202).json({message: 'Пользователь с таким логином уже существует',resultCode: 1})
        }


        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({fio,login,email,mobileNumber,role,password: hashedPassword})

        await user.save()

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

        let user = await User.findOne({login})

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