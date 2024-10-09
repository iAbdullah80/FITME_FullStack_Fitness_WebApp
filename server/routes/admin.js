const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const {
  adminAuthenticatedForLogin,
  adminAuthenticatedForDashboard
} = require('../middleware/auth')

// app routes

router.get('/admin', (req, res) => {
  res.redirect('/admin/dashboard')
})
router.get(
  '/admin/dashboard',
  adminAuthenticatedForDashboard,
  adminController.adminDashboard
)
router.get(
  '/admin/signin',
  adminAuthenticatedForLogin,
  adminController.adminLogin
)
router.post(
  '/admin/signin',
  adminAuthenticatedForLogin,
  adminController.adminLoginPost
)
router.get(
  '/admin/dashboard/add',
  adminAuthenticatedForDashboard,
  adminController.addItem
)
router.get(
  '/admin/dashboard/edit/:id',
  adminAuthenticatedForDashboard,
  adminController.editItem
)
router.post(
  '/admin/dashboard/add',
  adminAuthenticatedForDashboard,
  adminController.addItemPost
)
router.put(
  '/admin/dashboard/edit/:id',
  adminAuthenticatedForDashboard,
  adminController.editItemPut
)
router.delete(
  '/admin/dashboard/delete/:id',
  adminAuthenticatedForDashboard,
  adminController.deleteItem
)

module.exports = router
