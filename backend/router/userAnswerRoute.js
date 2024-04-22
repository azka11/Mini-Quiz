const express = require('express');
const router = express.Router();
const userAnswerRoute = require('../controllers/userAnswerController')
const { authenticateUser } = require('../middleware/authentication')

router.use(authenticateUser)
router.get('/', userAnswerRoute.findAnswer)
router.post('/create', userAnswerRoute.createAnswer)

module.exports = router