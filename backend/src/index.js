const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for localhost:3001
app.use(
    cors({
        origin: 'http://localhost:3001',
    })
);

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

