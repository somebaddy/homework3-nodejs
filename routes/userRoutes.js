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
);

router.get('/:id', 
  wrapRequest((req) => userService.getUser(req.params.id), "User not found")
);

router.post('/', createUserValid,
  wrapRequest((req) => userService.createUser(req.body))
);

router.patch('/:id', updateUserValid,
  wrapRequest((req) => userService.updateUser(req.params.id, req.body))
);

router.delete('/:id',
  wrapRequest((req) => userService.deleteUser(req.params.id))
);

router.use(responseMiddleware);

export { router };
