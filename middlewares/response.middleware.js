const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err) {
    if (!res.data) {
      res.status(404).json(res.data)
    }
  } else {
    res.status(200).json(res.data)
  }
  next();
};

export { responseMiddleware };
