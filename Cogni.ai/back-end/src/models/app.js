const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const learningRoutes = require('./routes/learning');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/cogni', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/auth', authRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;