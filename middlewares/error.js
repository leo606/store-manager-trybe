module.exports = (error, _req, res, _next) => {
  const { err, message, status } = error;
  if (err) {
    return res.status(status).json({ err });
  }
  return res.status(status).json({ message });
};