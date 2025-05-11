import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import { wrapRequest } from "./requestHelpers.js";


const router = Router();

// TODO: Implement route controllers for fighter
router.get("/", 
  wrapRequest((req) => fighterService.getFighters())
, responseMiddleware);

router.get("/:id", 
  wrapRequest((req) => fighterService.getFighter(req.params.id))
, responseMiddleware);

router.post("/", createFighterValid, 
  wrapRequest((req) => fighterService.createFighter(req.body))
, responseMiddleware);

router.patch("/:id", updateFighterValid,
  wrapRequest((req) => fighterService.updateFighter(req.params.id, req.body))
, responseMiddleware);

router.delete("/:id", 
  wrapRequest((req) => fighterService.deleteFighter(req.params.id))
, responseMiddleware);

export { router };
