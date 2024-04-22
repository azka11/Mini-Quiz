const express = require('express');
const router = express.Router();
const multipleChoiceController = require('../controllers/choiceController')
const { authenticateAdmin } = require('../middleware/authentication')

router.get('/', multipleChoiceController.findAllChoice)
router.get('/:question_id', multipleChoiceController.findChoiceByQuestion)
router.use(authenticateAdmin)
router.post('/create', multipleChoiceController.createChoice)
router.put('/update/:id', multipleChoiceController.updateChoice)
router.delete('/:id', multipleChoiceController.deleteChoice)


module.exports = router