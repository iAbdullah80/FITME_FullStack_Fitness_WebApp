const express=require('express')
const router=express.Router()
const dashboardController=require('../controllers/dashboardController')

router.get('/dashboard', dashboardController.dashboard)
router.get('/dashboard/pushDay', dashboardController.pushDay)
router.get('/dashboard/pullDay', dashboardController.pullDay)
router.get('/dashboard/legsDay', dashboardController.legsDay)
router.get('/dashboard/diet', dashboardController.diet)

module.exports=router