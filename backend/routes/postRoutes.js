const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/seed', postController.getPostData);

module.exports = router;