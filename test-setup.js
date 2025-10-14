import express from 'express';

const app = express();
const PORT = 3001;

app.get('/test', (req, res) => {
  res.json({ message: 'Setup is working!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log('Visit http://localhost:3001/test to verify');
});