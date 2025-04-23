const express = require('express');
const {addTask,getalltask,updatetask} = require('../controllers/task.js');
const {authenticate} = require('../middlewares/auth.js')
const router = express.Router();

router.post('/add',authenticate,addTask);
router.get('/task',authenticate,getalltask)
router.patch('/task/:id',authenticate,updatetask)

module.exports = router;
