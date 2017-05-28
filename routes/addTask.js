/**
 * Created by GOLDG on 2017/5/24.
 */
var express = require('express');
var taskList = require('../controllers/AddTaskController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('addTask', {taskName: req.body.taskName, downloadPath: req.body.downloadPath, fileName: req.body.fileName});
});

router.post('/createTask', function(req, res, next) {
    taskList.addTaskContr(req.body.taskName, req.body.downloadPath, req.body.fileName);
    res.redirect('/');
});

module.exports = router;
