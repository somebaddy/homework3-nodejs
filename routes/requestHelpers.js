const wrapRequest = (reader, emptyError = null) => {
  return (req, res, next) => {      
    try {
      const data = reader(req);
      if (!data && emptyError) {
        throw new Error(emptyError);
      } else {
        res.data = data;
      }
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  }
};

export { wrapRequest };