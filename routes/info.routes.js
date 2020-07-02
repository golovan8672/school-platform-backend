const {Router} = require('express')
const router = Router()

router.get('/information', async (req,res) => {
    res.end("HELLO")
})

module.exports = router