const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const uploadPhoto = require('../middleware/multer')
const { authenticateUser } = require('../middleware/authentication')

router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
router.post('/logout', userController.userLogout)

router.use(authenticateUser)
router.get('/specific', userController.getSpecificUser)
router.put('/edit/:id', uploadPhoto.single('image'), userController.editProfileUser)

module.exports = router;