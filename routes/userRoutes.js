import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get('/', (req, res, next) => {
  console.log('Users');
  try {
    const data = userService.getUsers();
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);


router.get('/:id', (req, res, next) => {
  console.log('User');
  try {
    const data = userService.getUser(req.params.id);
    res.data = data;
  }
  catch (err) {
    res.err = err;
  }
  finally {
    next();
  }
}, responseMiddleware);


router.post('/', createUserValid, (req, res, next) => {
  console.log('Create User');
  try {
    const data = userService.createUser(req.body);
    res.data = data;
    }
  catch (err) {
    res.err = err;
  }
  finally {
    next();
    }
}, responseMiddleware);


router.patch('/:id', updateUserValid, (req, res, next) => {
  console.log('Update User');
  try {
    const data = userService.updateUser(req.params.id, req.body);
    res.data = data;
  }
  catch (err) {
    res.err = err;
  }
  finally {
    next();
  }
}, responseMiddleware);


router.delete('/:id', (req, res, next) => {
  console.log('Delete User');
  try {
    const data = userService.deleteUser(req.params.id);
    res.data = data;
  }
  catch (err) {
    res.err = err;
  }
  finally {
    next();
  }
}, responseMiddleware);


export { router };
