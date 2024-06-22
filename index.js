// Importing Modules
const express = require('express');
const cors = require('cors');
const CompileService = require('./services/compile');

// Initialize Express App
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Online Compiler');
});

app.post('/compile', async (req, res) => {
  const { language = 'cpp', code, input } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, error: 'Empty Code Body' });
  }
  try {
    const response = await CompileService(language, code, input);
    return res.status(200).json({ success: true, result: response });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
