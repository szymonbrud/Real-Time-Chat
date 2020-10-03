export default (req, res, next) => {
  req.userId = req.body.userId || 'D3czjdfe';
  next();
};
