import express from 'express';
import { registerValidation } from './auth/auth.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserModel from './user/user.js';
import bcrypt from 'bcrypt';

mongoose
  .connect(
    'mongodb+srv://admin:PirloLegend2611@cluster0.5cpfl.mongodb.net/pets?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB KRUTO'))
  .catch((err) => console.log('DB NAEBNULAS', err));
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('111 Hello');
});

app.post('/auth/login', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    res.json({
      ...user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось зарегистрироваться',
    });
  }
});
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server Ok');
});
