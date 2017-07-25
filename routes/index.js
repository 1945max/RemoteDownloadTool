var express = require('express');
var taskList = require('../controllers/TaskListController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { listInfo: taskList.taskListInfoContr() });
});

router.get('/getCurrentInfo', function(req, res, next) {
    res.send({ listInfo: taskList.taskListInfoContr() });
});

router.post('/pause', function(req, res, next) {
    taskList.taskPauseContr(req.body.index);
    res.send({result:true});
});

router.post('/run', function(req, res, next) {
    taskList.startTaskContr(req.body.index);
    res.send({result:true});
});

router.post('/del', function(req, res, next) {
    taskList.delTaskContr(req.body.index);
    res.send({result:true});
});

module.exports = router;
