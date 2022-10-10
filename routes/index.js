var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/testingApp', function(req, res) {
  res.render('testing_js');
});
router.get('/Registration', function(req, res) {
  res.render('Registration');
});
router.get('/blog-single', function(req, res) {
  res.render('blog-single');
});
router.get('/blog', function(req, res) {
  res.render('blog');
});
router.get('/blog-single', function(req, res) {
  res.render('blog-single');
});
router.get('/browsejobs', function(req, res) {
  res.render('browsejobs');
});
router.get('/candidates', function(req, res) {
  res.render('candidates');
});
router.get('/job-post', function(req, res) {
  res.render('job-post');
});

module.exports = router;
