import { upload } from "../app";
const { Router } = require('express')
const router = Router()



router.post("/upload", upload, async (req, res) => {
    try {
        console.log(req.file)
        res.status(201).json({ message: "Файл отправлен!", resultCode: 0 })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});





module.exports = router