import { fighterRepository } from "../repositories/fighterRepository.js";
import { Error400, Error404 } from "../helpers/errors.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getFighters() {
    return fighterRepository.getAll();
  }

  getFighter(id) {
    return fighterRepository.getOne({ id });
  }

  createFighter(fighter) {
    const existingName = fighterRepository.getOne(it => it.name.toLowerCase() === fighter.name.toLowerCase());
    if (existingName) {
      throw new Error400("Fighter name already registered.")
    }
    return fighterRepository.create(fighter);
  }

  updateFighter(id, fighter) {
    const updatedFighter = fighterRepository.update(id, fighter);
    if (!updatedFighter || !updatedFighter.id) {
      throw new Error404("Fighter not found");
    }
    return updatedFighter;
  }

  deleteFighter(id) {
    const deletedFighter = fighterRepository.delete(id);
    if (!deletedFighter || deletedFighter.length === 0) {
      throw new Error404("Fighter not found");
    } 
    return deletedFighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
