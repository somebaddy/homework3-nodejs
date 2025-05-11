import { fighterRepository } from "../repositories/fighterRepository.js";
import { Error400 } from "../helpers/errors.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getFighters() {
    return fighterRepository.getAll();
  }

  getFighter(id) {
    return fighterRepository.getOne({ id });
  }

  createFighter(fighter) {
    const existingName = fighterRepository.getOne({name: fighter.name});
    if (existingName) {
      throw new Error400("Fighter name already registered.")
    }
    return fighterRepository.create(fighter);
  }

  updateFighter(id, fighter) {
    return fighterRepository.update(id, fighter);
  }

  deleteFighter(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
