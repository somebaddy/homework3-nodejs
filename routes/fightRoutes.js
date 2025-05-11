import { Router } from "express";
import { fightsService } from "../services/fightService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { wrapRequest } from "./requestHelpers.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get("/", 
  wrapRequest((req) => fightsService.getFights())
, responseMiddleware);

router.get("/:id", 
  wrapRequest((req) => fightsService.getFight(req.params.id))
, responseMiddleware);

router.post("/", 
  wrapRequest((req) => fightsService.createFight(req.body))
, responseMiddleware);

router.delete("/:id", 
  wrapRequest((req) => fightsService.deleteFight(req.params.id))
, responseMiddleware); 

export { router };
