const express = require('express');
const port = 5000;
const cors = require('cors');
const mongoose = require('mongoose')
const UserModel = require('./models/user.model')
const { getAllUsers, getAllFoods, allUsers } = require("./db");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const requireSignIn = require('./middlewares/authMiddleware')
const requireAdmin = require('./middlewares/adminMiddleware')
const findUserByToken = require('./middlewares/findUserByToken')
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
      const token = jwt.sign(
        { userId: user._id },
        secretKey
      )

      return res.json({ status: 'ok', token: token })
    }
    else {
      return res.json({ status: 'error', error: `Incorrect password` })
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


//Đăng xuất
app.post('/account/logout', (req, res) => {
  res.sendStatus(200);
});


app.get('/data/foods', requireSignIn, requireAdmin, async (req, res) => {
  const data = await getAllFoods()
  res.json(data)
})

//Hiển thị thông tin tài khoản tại trang admin
app.get('/admin', findUserByToken, async (req, res) => {
  try {
    const user = req.user
    res.send({ username: user.username, email: user.email, role: user.role });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send({ error: 'Server error' });
  }
});

//Kiểm tra password trước khi cập nhật thông tin tài khoản
app.post('/check-password', findUserByToken, async (req, res) => {
  try {
    const user = req.user;
    const password = req.password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      res.status(200).json(
        {
          message: 'Password is correct',
          user: user
        });
    } else {
      res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error checking password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Update thông tin người dùng
app.put('/update-user', async (req, res) => {
  try {
    const { user, updatedData } = req.body;
    const updatedFields = {
      username: updatedData.username,
      email: updatedData.email
    }
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, updatedFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User data updated successfully', updatedUser });
  } catch (err) {
    if (err.code === 11000) {
      if (err.keyPattern.username) {
        res.status(500).json({ status: 'error', error: 'Duplicate username' });;
      } else if (err.keyPattern.email) {
        res.status(500).json({ status: 'error', error: 'Duplicate email' });
      }
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});


//Đổi mật khẩu
app.put('/change-password', async (req, res) => {
  try {
    const { user, password } = req.body;
    const hashedNewPassword = await bcrypt.hash(password, saltRounds)
    const updatedPassword = await UserModel.findByIdAndUpdate(user._id, { password: hashedNewPassword }, { new: true });

    if (!updatedPassword) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User data updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
