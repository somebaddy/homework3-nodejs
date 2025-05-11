const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err) {
    let { message, code } = res.err;
    code = code || 500;
    message = message || "Unknown error. That's embarrassing."
    res.status(code).json({
      error: true,
      message
    })
  } else {
    res.status(200).json(res.data)
  }
  next();
};

export { responseMiddleware };
