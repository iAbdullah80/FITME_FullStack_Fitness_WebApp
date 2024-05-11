const express=require('express')
const router=express.Router()
const mainController=require('../controllers/mainController')
const auth=require('../controllers/auth')

// app routes

router.get('/', mainController.homepage)
router.get('/signup', mainController.signup)
router.get('/signin', mainController.signin)
router.get('/reset', mainController.reset)



module.exports=router