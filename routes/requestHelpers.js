import { Error404 } from "../helpers/errors.js";

const wrapRequest = (reader, emptyError = null) => {
  return (req, res, next) => {      
    try {
      const data = reader(req);
      
      if (!data && emptyError) {
        throw new Error404(emptyError);
      } else {
        res.data = data;
      }

      next();
    } catch (err) {
      next(err);
    }
  }
};

export { wrapRequest };