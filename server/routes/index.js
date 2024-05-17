const express=require('express')
const router=express.Router()
const mainController=require('../controllers/mainController')
const {authenticated}=require('../middleware/auth')

// app routes

router.get('/', mainController.homepage)
router.get('/signup', authenticated, mainController.signup)
router.get('/signin', authenticated, mainController.signin)
router.get('/reset', authenticated, mainController.reset)


module.exports=router