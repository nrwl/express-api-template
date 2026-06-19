/**
 * Express API - entry point
 * Swap the in-memory store in controllers/ for a real DB to go production.
 */

import express from 'express';
import * as path from 'path';
import healthRouter from './routes/health.route';
import itemsRouter from './routes/items.route';

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.use('/api/health', healthRouter);
app.use('/api/items', itemsRouter);

// Root redirect to health
app.get('/', (req, res) => {
  res.redirect('/api/health');
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
  console.log(`  GET  /api/health`);
  console.log(`  GET  /api/items`);
  console.log(`  POST /api/items`);
  console.log(`  GET  /api/items/:id`);
  console.log(`  DEL  /api/items/:id`);
});
server.on('error', console.error);
