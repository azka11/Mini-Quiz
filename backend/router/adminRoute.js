const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const uploadPhoto = require('../middleware/multer')
const { authenticateAdmin } = require('../middleware/authentication')

router.post('/register', adminController.adminRegister)
router.post('/login', adminController.adminLogin)
router.post('/logout', adminController.adminLogout)

router.use(authenticateAdmin)
router.get('/specific', adminController.getSpecificAdmin)
router.put('/edit/:id', uploadPhoto.single('image'), adminController.editProfileAdmin)

module.exports = router;