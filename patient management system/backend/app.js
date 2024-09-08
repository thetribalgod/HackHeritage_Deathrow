import express from 'express';
import { dbConnection } from './database/dbConnection.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { errorMiddleware } from './middlewares/error.js';
import messageRouter from './router/messageRouter.js';
import userRouter from './router/userRouter.js';
import appointmentRouter from './router/appointmentRouter.js';

// Load environment variables from .env file
config(); // Loads .env file variables into process.env

// Log the MongoDB URI for debugging
console.log('Connecting to database using URI:', process.env.MONGO_URI);

// Initialize Express app
const app = express();

// Enhanced CORS setup
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    process.env.DASHBOARD_URL,
    'http://localhost:5173' // Explicitly allowing localhost:5173
  ],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
  credentials: true, // Allow sending credentials like cookies or authentication tokens
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allow necessary headers
  exposedHeaders: ['Authorization'] // Expose necessary headers to the client
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// API routes
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/appointment', appointmentRouter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
