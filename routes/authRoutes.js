import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { wrapRequest } from "./requestHelpers.js";


const router = Router();

router.post('/login',
  wrapRequest((req) => authService.login(req.body)), 
  responseMiddleware
)

export { router };
