const {Router} = require('express')
const router = Router()
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// const config = require('config')
// const {check, validationResult} = require('express-validator')
const User = require('../models/User')


router.post('/registration', async (req,res) => {
    try{
        console.log("Body:", req.body)

        const {login,password} = req.body

        const userLogin  = await User.findOne({login})

        if (userLogin ) {
            return res.status(400).json({message: 'Пользователь с таким логином уже существует'})
        }


        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({login,password: hashedPassword})

        await user.save()

        res.status(201).json({message: "Пользователь создан"})
    } catch (e){
        res.status(500).json({message : 'Что-то пошло не так, попробуйте снова'})
    }
})
// router.post('/login',
// [
//     check('login','Введите логин').exists(),
//     check('password','Введите пароль').exists(),
// ],
//  async (req,res) => {
//     try{
//         const errors = validationResult(req)

//         if(!errors.isEmpty()){
//             return res.status(400).json({
//                 errors: errors.array(),
//                 message: "Некорректные данные при входе в систему"

//             })
//         }

//         const {login,password} = req.body

//         let user = await User.findOne({login})

//         if (!user) {
//             return res.status(400).json({message: 'Неверный логин или пароль'})
//         }

//         const isMatch = await bcrypt.compare(password,user.password)
        
//         if (!isMatch) {
//             return res.status(400).json({message: 'Неверный логин или пароль'})
//         }

//         const token = jwt.sign(
//             { userId: user.id },
//             config.get('jwtSecret'),
//             {expiresIn: '1h'}
//         )

//         res.json({token, userId: user.id, role: user.role})


//     } catch (e){
//         res.status(500).json({message : 'Что-то пошло не так, попробуйте снова'})
//     }
// })

module.exports = router