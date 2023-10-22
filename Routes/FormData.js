const express = require('express')
const router = express.Router()
const collection = require("../Models/UserFiles")


router.post('/', (req, res)=>{
    const user = collection(req.body)
    user.save()
    console.log(user)
    res.send(user)
})

module.exports = router