// server/index.js
import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';

const app = express();
const PORT = process.env.EXPRESS_PORT || 8080;


// 動作確認用のエンドポイント
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.json({ status: 'ok', time: new Date().toISOString() });
});


const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server running at http://0.0.0.0:${PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});