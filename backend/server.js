const express = require('express');
const port = 5000;
const cors = require('cors');
const mongoose = require('mongoose')
const UserModel = require('./models/user.model')
const { connectToDb, getAllUsers } = require("./db");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const requireSignIn = require('./middlewares/authMiddleware')
const requireAdmin = require('./middlewares/adminMiddleware')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json())
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET;
mongoose.connect("mongodb+srv://pizza:pizza@cluster0.5lroxkm.mongodb.net/PizzaStore", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

//Kiểm tra kết nối với front end
app.get('/test', (req, res) => {
  console.log('API request received from frontend');
  const data = { message: 'Hello from the backend!' };
  res.json(data);
});
app.post('/test-connection', (req, res) => {
  console.log(req.body);
  res.json({ status: "ok" });
});

//Login function
app.post('/account/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.username
    })
    if (!user) {
      return res.json({ status: 'error', error: `User doesn't exist` })
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (isPasswordValid) {
      console.log('ok')
      const token = jwt.sign(
        { userId: user._id },
        secretKey
      )

      return res.json({ status: 'ok', token: token })
    }
  } catch (err) {
    res.json({ status: 'error', error: err })
  }
})

//Đăng ký tài khoản
app.post('/account/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    const userId = uuidv4();
    console.log(userId)
    await UserModel.create({
      userId: userId,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: 'user',
    })
    res.json({ status: 'ok' })
  } catch (err) {
    console.log('Lỗi', err.keyPattern)
    if (err.code === 11000) {
      if (err.keyPattern.username) {
        res.json({ status: 'error', error: 'Duplicate username' });;
      } else if (err.keyPattern.email) {
        res.json({ status: 'error', error: 'Duplicate email' });
      }
    } else {
      res.json({ status: 'error', error: 'An error occurred' });
    }

    //Đăng xuất
    app.post('/account/logout', (req, res) => {
      console.log('Reached log out backend')
      res.sendStatus(200);
    });
  }
})

  //Test authen + admin middleware
  app.get('/protected', requireSignIn, requireAdmin, (req, res) => {
    res.sendStatus(200);
  });

app.post('/account/logout', (req, res) => {
  res.sendStatus(200);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
