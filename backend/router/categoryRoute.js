const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')
// const uploadPhoto = require('../middleware/multer')
const { authenticateAdmin } = require('../middleware/authentication')

router.get('/', categoryController.findAllCategory)
router.use(authenticateAdmin)
router.post('/create', categoryController.createCategory)
router.put('/update/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

// router.route('/:id')
// .get(questionController.findQuestionById)

module.exports = router;