import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation } from './validation.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';

mongoose
  .connect(
    'mongodb+srv://admin:PirloLegend2611@cluster0.5cpfl.mongodb.net/pets?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB KRUTO'))
  .catch((err) => console.log('DB NAEBNULAS', err));
const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation ,UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.checkMe);

app.get('/', (req, res) => {
  res.send('111 Hello');
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server Ok');
});
