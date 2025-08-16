const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes'); // <-- import your seed route

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors({
  origin: 'http://localhost:3000', // replace with your frontend's URL/port
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api', authRoutes);
app.use('/api', postRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
