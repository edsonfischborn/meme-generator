const express = require('express');

const routes = express.Router();

// Middlewares
const validImg = require('./middlewares/validImg');

// Controllers
const MemeController = require('./controllers/MemeController');

routes.post('/meme', validImg, MemeController.store);

module.exports = routes;
