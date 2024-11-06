const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const documentController = require('./controllers/documentController');
const upload = require('./middleware/upload');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route for document upload
app.post('/api/extract', upload.single('document'), documentController.extractDocumentInfo);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});