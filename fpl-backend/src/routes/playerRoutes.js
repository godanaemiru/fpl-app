const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/top', playerController.getTopPerformers);
router.get('/differentials', playerController.getDifferentials); // New endpoint

module.exports = router;