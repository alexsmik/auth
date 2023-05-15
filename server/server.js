require('dotenv').config();
require('express-async-errors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
//  routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(cors());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// production mode build(dist) frontend in backend
app.use(express.static('dist'));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5001;
const start = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('DB CONNECTED'))
      .catch((err) => console.log('DB CONNECTION ERR', err));
    app.listen(PORT, () => console.log(`Server started = ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
