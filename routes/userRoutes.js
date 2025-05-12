import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { wrapRequest } from "./requestHelpers.js";

const router = Router();

router.get('/', 
  wrapRequest((req) => userService.getUsers())
, responseMiddleware);

router.get('/:id', 
  wrapRequest((req) => userService.getUser(req.params.id), "User not found")
, responseMiddleware);

router.post('/', createUserValid,
  wrapRequest((req) => userService.createUser(req.body))
, responseMiddleware);

router.patch('/:id', updateUserValid,
  wrapRequest((req) => userService.updateUser(req.params.id, req.body))
, responseMiddleware);

router.delete('/:id',
  wrapRequest((req) => userService.deleteUser(req.params.id))
, responseMiddleware);

export { router };
