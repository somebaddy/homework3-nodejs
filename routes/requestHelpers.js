const wrapRequest = (reader) => {
  return (req, res, next) => {      
    try {
      res.data = reader(req);
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  }
};

export { wrapRequest };