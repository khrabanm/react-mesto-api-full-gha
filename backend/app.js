const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/error');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://mesto.khrabanm.nomoredomainsrocks.ru', 'https://api.mesto.khrabanm.nomoredomainsrocks.ru'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Connected to the data base'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
