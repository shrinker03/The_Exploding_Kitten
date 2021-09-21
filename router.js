const express = require('express');
const router = express.Router();

const { index, create, update } = require('./controllers/UserController');

//user routes
router.get('/api/users', index);

router.post('/api/users', create);

router.put('/api/user/:username', update);

module.exports = router;
