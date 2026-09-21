var express = require('express');
var router = express.Router();
const { success } = require('../middlewares/apiResponse');
const destinationRoutes = require('../modules/destination/destinationRoutes');

router.get('/', (req, res) => {

  return success(res, {

    name: 'TravelBuddy API',
    version: '1.0.0',
    status: 'online'

  }, 'Bem-vindo à API do TravelBuddy.');

});

router.use('/destinations', destinationRoutes);

module.exports = router;