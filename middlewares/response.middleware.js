const responseMiddleware = (req, res, next) => {
  if (res.err) {
    // TODO: probably never will be called but need additonal tests.
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
