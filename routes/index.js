var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/testingApp', function(req, res, next) {
  res.render('testing_js');
});
router.get('/Registration', function(req, res, next) {
  res.render('Registration');
});
router.get('/blog-single', function(req, res, next) {
  res.render('blog-single');
});
router.get('/lk', function(req, res, next) {
  res.render('blog');
});
module.exports = router;
