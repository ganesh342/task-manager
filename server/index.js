import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json()); 


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.send('Task Manager API running ✅');
});


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected ✅');
    app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
  })
  .catch((err) => console.error('MongoDB connection error ❌:', err.message));
