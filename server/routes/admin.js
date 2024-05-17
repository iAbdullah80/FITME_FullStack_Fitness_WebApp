const express=require('express')
const router=express.Router()
const adminController=require('../controllers/adminController')

// app routes

router.get('/admin/dashboard', adminController.adminDashboard)
router.get('/admin/login', adminController.adminLogin)
router.get('/admin/dashboard/add', adminController.addItem)
router.get('/admin/dashboard/edit/:id', adminController.editItem)
router.post('/admin/dashboard/add', adminController.addItemPost)
router.put('/admin/dashboard/edit/:id', adminController.editItemPut)
router.delete('/admin/dashboard/delete/:id', adminController.deleteItem)



module.exports=router