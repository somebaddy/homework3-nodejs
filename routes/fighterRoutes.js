import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get("/", (req, res, next) => {
  console.log("Fighters");
  try {
    const data = fighterService.getFighters();
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", (req, res, next) => {
  console.log("Fighter");
  try {
    const data = fighterService.getFighter(req.params.id);
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", createFighterValid, (req, res, next) => {
  console.log("Create Fighter");
  try {
    const data = fighterService.createFighter(req.body);
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.patch("/:id", updateFighterValid, (req, res, next) => {
  console.log("Update Fighter");
  try {
    const data = fighterService.updateFighter(req.params.id, req.body);
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete("/:id", (req, res, next) => {
  console.log("Delete Fighter");
  try {
    const data = fighterService.deleteFighter(req.params.id);
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
