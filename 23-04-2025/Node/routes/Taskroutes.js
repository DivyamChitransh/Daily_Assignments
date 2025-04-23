const express = require('express');
const {addTask,getalltask} = require('../controllers/task.js');
const router = express.Router();

router.post('/add',addTask);
router.get('/task',getalltask)

module.exports = router;
