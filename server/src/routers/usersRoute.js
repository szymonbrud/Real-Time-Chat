import express from 'express';

const router = new express.Router();

router.get('/hello', (req, res) => {
  res.send('hello kitty!');
  res.end();
});

export default router;
