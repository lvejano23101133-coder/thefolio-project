require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
connectDB(); 

// ── Middleware ─────────────────────────────────────────────────

// UPDATED CORS: Allow both local testing and your live Vercel site
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://thefolio-project-roan.vercel.app",
    "https://thefolio-project-55964wkrb-lvejano23101133-coders-projects.vercel.app" // Idagdag itong URL mula sa error mo
  ],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// ── Start Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});