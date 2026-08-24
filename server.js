const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const epgManager = require('./src/epg/epgManager');
const iptvManager = require('./src/iptv/iptvManager');
const channelRouter = require('./src/routes/channels');
const epgRouter = require('./src/routes/epg');
const guideRouter = require('./src/routes/guide');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize data
(async () => {
  console.log('Initializing Canadian IPTV Player...');
  try {
    await iptvManager.initialize();
    await epgManager.initialize();
    console.log('✓ IPTV Manager initialized');
    console.log('✓ EPG Manager initialized');
  } catch (error) {
    console.error('Initialization error:', error);
  }
})();

// API Routes
app.use('/api/channels', channelRouter);
app.use('/api/epg', epgRouter);
app.use('/api/guide', guideRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'active', 
    service: 'Canadian IPTV Player',
    timestamp: new Date().toISOString()
  });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🎬 Canadian IPTV Player running on http://localhost:${PORT}`);
  console.log(`📺 Serving legal Canadian TV networks with EPG guide...\n`);
});

module.exports = app;