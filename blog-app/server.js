const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Define storage for the images
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize upload with the defined storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
}).single('image');

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API route to handle image upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Image upload failed', error: err });
    }

    // Return the uploaded image URL
    const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;
    return res.status(200).json({ imageUrl });
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
