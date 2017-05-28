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

module.exports = router;
