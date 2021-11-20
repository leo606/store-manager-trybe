const statusCodes = require('../commons/statusCodes.json');

function setStatus(code) {
  switch (code) {
    case 'invalid_data':
      return statusCodes.unprocessableEntity;
    case 'stock_problem':
       return statusCodes.notFound;
    case 'not_found':
      return statusCodes.notFound;
    default:
      break;
  }
}

module.exports = (error, _req, res, _next) => {
  const { err, message, status } = error;
  const stat = setStatus(err.code);

  if (err) {
    return res.status(stat).json({ err });
  }

  return res.status(status).json({ message });
};
