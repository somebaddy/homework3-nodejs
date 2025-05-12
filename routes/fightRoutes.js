import { Router } from "express";
import { fightsService } from "../services/fightService.js";
import { createFightValid } from "../middlewares/fight.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { wrapRequest } from "./requestHelpers.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get("/", 
  wrapRequest((req) => fightsService.getFights())
);

router.get("/:id", 
  wrapRequest((req) => fightsService.getFight(req.params.id), "Fight not found.")
);

router.post("/", createFightValid,
  wrapRequest((req) => fightsService.createFight(req.body))
);

router.delete("/:id", 
  wrapRequest((req) => fightsService.deleteFight(req.params.id))
); 

router.use(responseMiddleware);

export { router };
