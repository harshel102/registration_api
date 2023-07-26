// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Replace 'your_mongodb_uri' with your actual MongoDB URI.
const mongodbURI = 'mongodb://localhost:27017/your_database_name';
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
  
    const newUser = new User({ name, email, password });
  
    newUser.save()
      .then(() => res.json({ message: 'User registered successfully' }))
      .catch(error => res.status(500).json({ error: 'Failed to register user' }));
  });
  
