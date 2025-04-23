const express = require('express');
const {addTask,getalltask,updatetask} = require('../controllers/task.js');
const router = express.Router();

router.post('/add',addTask);
router.get('/task',getalltask)
router.patch('/task/:id',updatetask)

module.exports = router;
