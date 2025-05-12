import { setResponseError } from './helpers.js';

const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err) {
    next(res.err);
  } else {
    res.status(200).json(res.data);
    next();
  }
};

const responseErrorMiddleware = (err, req, res, next) => {
  setResponseError(res, err);
  next();
};

export { responseMiddleware, responseErrorMiddleware };
