const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import routes and controllers
const authRoutes = require('./routes/authRoutes');
const profileRoute = require('./routes/profileUpdateRoutes');
const { paymentRazorPay } = require('./controllers/paymentController');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
});

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoute);
app.post('/payment-api', paymentRazorPay);

// Health check
app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});

// Socket.IO logic
io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`📌 User ${userId} joined room with socket ID: ${socket.id}`);
    });

    socket.on('send_message', (data) => {
        console.log('📩 Message received from client:', data);

        if (!data || !data.message || !data.sender || !data.recipientId) {
            console.log("❌ Missing required message fields.");
            return;
        }

        const response = {
            status: "New message received!",
            sender: data.sender,
            message: data.message,
            timestamp: new Date().toISOString(),
        };

        if (data.recipientId) {
            io.to(data.recipientId).emit('receive_message', response);
            console.log(`📤 Message sent to user ${data.recipientId}`);
        } else {
            io.emit('receive_message', response);
            console.log("📢 Message broadcasted to all users.");
        }
    });

    socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

// Start server
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
