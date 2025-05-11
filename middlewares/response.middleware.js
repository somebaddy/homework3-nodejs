const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err) {
    if (!res.data) {
      res.status(404).json({ 
        error: true,
        message: res.err.message
      })
    } else {
      res.status(401).json({
        error: true,
        message: res.err.message
      })
    }
  } else {
    res.status(200).json(res.data)
  }
  next();
};

export { responseMiddleware };
