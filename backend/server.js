const express = require('express');
const app = express();
const port = 5000; 
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

//Kiểm tra kết nối với front end
app.get('/test-connection', (req, res) => {
    console.log('API request received from frontend');
    const data = { message: 'Hello from the backend!' };
    res.json(data);
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
