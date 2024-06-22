const express = require('express');
const router = express.Router();
const cors = require('cors');
const CompileService = require('../services/compile');
const serverless = require('serverless-http');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));


router.get('/', (req, res) => {
  return res.json({
    "HomePage": "Running"
  });
});

router.post('/compile', async (req, res) => {
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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);