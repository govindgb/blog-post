const express = require('express');
const http = require('http');
const multer = require('multer');
const path = require('path');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp as file name
  }
});
const upload = multer({ storage });

// Store blogs and comments in memory for simplicity
let blogs = [];
let commentsData = {};

// API route to handle blog post creation with image
app.post('/api/blogs', upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const newBlog = {
    id: blogs.length + 1,
    title,
    content,
    image: imageUrl,  // Store image URL in the blog post
  };

  blogs.push(newBlog);
  res.status(201).json(newBlog);
});

// Serve the uploads folder as static files so we can access images
app.use('/uploads', express.static('uploads'));

// Serve the app
server.listen(4000, () => {
  console.log('Listening on port 4000');
});

// Socket.io handling (same as before)
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('new-comment', (data) => {
    const { postId, comment } = data;
    if (!commentsData[postId]) commentsData[postId] = [];
    commentsData[postId].push(comment);
    io.emit('comments-updated', { postId, comments: commentsData[postId] });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
