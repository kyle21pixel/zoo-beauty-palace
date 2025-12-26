import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { pool } from './db/connection';

// Import routes
import servicesRouter from './routes/services';
import bookingsRouter from './routes/bookings';
import usersRouter from './routes/users';
import reviewsRouter from './routes/reviews';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await pool.query('SELECT NOW()');
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected',
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// API Routes
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-room', (roomId: string) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('booking-update', (data) => {
    io.to(data.roomId).emit('booking-status-changed', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Start server
httpServer.listen(PORT, async () => {
  console.log(`
  🦓 Zoo Beauty Palace API Server
  ================================
  Server running on: http://localhost:${PORT}
  Health check: http://localhost:${PORT}/health
  Environment: ${process.env.NODE_ENV || 'development'}
  Database: ${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT}
  
  ⚠️  NO AUTHENTICATION - Development Mode
  `);
  
  // Test database connection on startup
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('  ✅ Database connected successfully');
  } catch (error) {
    console.error('  ❌ Database connection failed:', error);
    console.error('\n  💡 Tip: Run "npm run db:init" to initialize the database');
    console.error('          Then run "npm run db:seed" to add sample data\n');
  }
});

export { io };
