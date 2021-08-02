const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { apiLimiter } = require('./middlewares/rateLimiter');
const errorHandler = require('./errors/errorHandler');
const { mongoRoute, mongoSettings } = require('./utils/mongoSettings');

const allowedCors = [
  'https://er-nick-mesto.nomoredomains.monster',
  'http://er-nick-mesto.nomoredomains.monster',
  'localhost:3000',
];

const app = express();

mongoose.connect(mongoRoute, mongoSettings);

app.use(helmet());

app.use(apiLimiter);

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-WIth, Content-Type, Accept',
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    );
  }

  next();
});

app.use((req, res, next) => {
  const { method } = req;

  if (method === 'OPTIONS') {
    res.status(200).json('ok');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-WIth, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Credentials', true);
  }

  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(requestLogger);

// app.get("/crash-test", () => {
//   setTimeout(() => {
//     throw new Error("Сервер сейчас упадёт");
//   }, 0);
// });

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(5000, () => {});
