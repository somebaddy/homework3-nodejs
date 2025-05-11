import { Router } from "express";
import { fightsService } from "../services/fightService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.get("/", (req, res, next) => {
  console.log("Fights");
  try {
    const data = fightsService.getFights();
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", (req, res, next) => {
  console.log("Fight");
  try {
    const data = fightsService.getFight(req.params.id);
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", (req, res, next) => {
  console.log("Create Fight");
  try {
    const data = fightsService.createFight(req.body);
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);
 

export { router };
