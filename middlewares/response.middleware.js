const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  res.status(200).json(res.data)
  next();
};

export { responseMiddleware };
