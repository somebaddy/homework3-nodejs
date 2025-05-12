import { setResponseError } from './helpers.js';

const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err) {
    setResponseError(res, res.err);
  } else {
    res.status(200).json(res.data)
  }
  next();
};

export { responseMiddleware };
