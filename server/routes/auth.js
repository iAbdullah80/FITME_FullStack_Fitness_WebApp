const express=require('express')
const router=express.Router()
const auth=require('../controllers/auth')

// app routes
router.get('/logout', auth.logout)
router.post('/signup', auth.register)
router.post('/signin', auth.login)
router.put('/reset', auth.resetPassword)


module.exports=router