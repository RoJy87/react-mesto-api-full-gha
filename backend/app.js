require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const NotFoundError = require('./middlewares/errors/NotFoundError');
const customErrors = require('./middlewares/errors/customErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://simon.mesto.nomoreparties.sbs',
  ],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
}));

app.use(requestLogger);
app.use(limiter);

app.use('/', require('./routes/auth'));

app.use('/', auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use(customErrors);

app.listen(PORT);
