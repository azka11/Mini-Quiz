const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController')
const { authenticateAdmin } = require('../middleware/authentication')

router.get('/', questionController.findAllQuestion)
router.get('/category/:category_id', questionController.findQuestionByCategory)
router.use(authenticateAdmin)
router.get('/admin', questionController.findQuestionByAdmin)
router.post('/create', questionController.createQuestion)
router.put('/update/:id', questionController.updateQuestion)
router.route('/:id')
.get(questionController.findQuestionById)
.delete(questionController.deleteQuestion)

module.exports = router;