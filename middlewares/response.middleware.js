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
  let { message, code } = err;
  code = code || 500;
  message = message || "Unknown error. That's embarrassing."
  res.status(code).json({
    error: true,
    message
  });
  next();
};

export { responseMiddleware, responseErrorMiddleware };
