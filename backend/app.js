var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var searchRoutes = require('./modules/search/searchRoutes');
var userRoutes = require('./modules/user/userRoutes');
var errorHandler = require('./middlewares/errorHandler');
var sequelize = require('./config/database');
var likeRoutes = require('./modules/like/likeRoutes');
var commentRoutes = require('./modules/comment/commentRoutes');
var followRoutes = require('./modules/follow/followRoutes');
var collectionRoutes = require('./modules/collection/collectionRoutes');
var notificationRoutes = require('./modules/notification/notificationRoutes');
var reportRoutes = require('./modules/report/reportRoutes');

require('./config/associations');

var app = express();

app.use(logger('dev'));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api', indexRouter);
app.use('/api', searchRoutes);
app.use('/api', userRoutes);
app.use('/api', likeRoutes);
app.use('/api', commentRoutes);
app.use('/api', followRoutes);
app.use('/api', collectionRoutes);
app.use('/api', notificationRoutes);
app.use('/api', reportRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada.',
    errors: []
  });
});

app.use(errorHandler);

sequelize.sync({ alter: true })
  .then(() => console.log('Banco de dados sincronizado!'))
  .catch(err => console.error('Erro ao sincronizar banco:', err));

module.exports = app;