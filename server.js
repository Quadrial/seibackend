const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Seiguard 🚀');
});

// Health check (optional for hackathon demo)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Seiguard backend', upstream: 'api.seistream.app' });
});

// Proxy middleware for /api -> Seistream
app.use(
    '/',
    createProxyMiddleware({
      target: 'https://api.seistream.app',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});