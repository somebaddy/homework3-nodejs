import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import { createFightValid } from "../middlewares/fight.validation.middleware.js";
import { responseErrorMiddleware, responseMiddleware } from "../middlewares/response.middleware.js";
import { wrapRequest } from "./requestHelpers.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get("/", 
  wrapRequest((req) => fightersService.getFights())
);

router.get("/:id", 
  wrapRequest((req) => fightersService.getFight(req.params.id), "Fight not found.")
);

router.post("/", createFightValid,
  wrapRequest((req) => fightersService.createFight(req.body))
);

router.delete("/:id", 
  wrapRequest((req) => fightersService.deleteFight(req.params.id))
); 

router.use(responseMiddleware);
router.use(responseErrorMiddleware);

export { router };
