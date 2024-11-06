# Document Processor Extractor

## Project Structure
```
document-extractor/
├── client/                 # Frontend React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── DocumentUpload.js
│   │   │   └── ResultDisplay.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   └── package.json
│
├── server/                 # Backend Node.js application
│   ├── src/
│   │   ├── controllers/
│   │   │   └── documentController.js
│   │   ├── middleware/
│   │   │   └── upload.js
│   │   ├── utils/
│   │   │   └── extractInfo.js
│   │   └── app.js
│   └── package.json
│
└── README.md
```

## Setup Instructions

1. Clone the repository:
```bash
git clone 
cd document-processor
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Start the backend server:
```bash
cd ../server
npm start
```

5. Start the frontend application:
```bash
cd ../client
npm start
```

## Required Dependencies

### Backend (server/package.json):
- express
- multer (for file uploads)
- tesseract.js (for OCR)
- cors
- dotenv

### Frontend (client/package.json):
- react
- react-dom
- axios
- @mui/material
- @emotion/react
- @emotion/styled